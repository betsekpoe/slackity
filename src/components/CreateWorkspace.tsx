import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { addDoc, collection, Timestamp } from "firebase/firestore"
import { db } from "@/firebase"
import { addWorkspaceToUser } from "@/services/userService"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useNavigate } from "react-router-dom"

export default function CreateWorkspace({
	className,
	onSuccess,
	...props
}: React.ComponentProps<"div"> & {
	onSuccess?: () => void
}) {
	const { user } = useAuth()
	const [name, setName] = useState("")
	const [description, setDescription] = useState("")
	const [error, setError] = useState("")
	const [success, setSuccess] = useState("")
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	const validateForm = () => {
		if (!name.trim()) {
			setError("Workspace name is required")
			return false
		}
		if (name.trim().length < 3) {
			setError("Workspace name must be at least 3 characters")
			return false
		}
		return true
	}

	const handleCreateWorkspace = async (e: React.FormEvent) => {
		e.preventDefault()
		setError("")
		setSuccess("")

		if (!validateForm() || !user) {
			return
		}

		setLoading(true)

		try {
			// Create workspace in Firestore
			const workspace = {
				name: name.trim(),
				description: description.trim(),
				ownerId: user.uid,
				members: [
					{
						userId: user.uid,
						role: "owner",
						joinedAt: Timestamp.now(),
					},
				],
				createdAt: Timestamp.now(),
				settings: {
					isPublic: false,
					allowPublicChannels: false,
				},
			}

			const docRef = await addDoc(collection(db, "workspaces"), workspace)

			// Add workspace to user's workspaceIds
			await addWorkspaceToUser(user.uid, docRef.id)

			setSuccess("Workspace created successfully!")
			setName("")
			setDescription("")

			// Call onSuccess callback
			setTimeout(() => {
				onSuccess?.()
			}, 1500)

			// Navigate to new workspace
			setTimeout(() => {
				navigate(`/workspaces/${docRef.id}`)
			}, 1000)
		} catch (err: any) {
			setError(err.message || "Failed to create workspace")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className={cn("flex flex-col gap-6 p-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle>Create a Workspace</CardTitle>
					<CardDescription>
						Create a new workspace to start organizing your tasks
					</CardDescription>
				</CardHeader>
				<CardContent>
					{error && (
						<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
							{error}
						</div>
					)}
					{success && (
						<div className="mb-4 p-3 bg-green-50 border border-green-200 rounded text-green-700 text-sm">
							{success}
						</div>
					)}

					<form onSubmit={handleCreateWorkspace}>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="workspace-name">
									Workspace Name *
								</FieldLabel>
								<Input
									id="workspace-name"
									placeholder="e.g. Design Team, Marketing"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
									disabled={loading}
								/>
								<FieldDescription>
									Choose a name that represents your team or
									project
								</FieldDescription>
							</Field>

							<Field>
								<FieldLabel htmlFor="workspace-description">
									Description
								</FieldLabel>
								<Input
									id="workspace-description"
									placeholder="e.g. Task management for our design team"
									value={description}
									onChange={(e) =>
										setDescription(e.target.value)
									}
									disabled={loading}
								/>
								<FieldDescription>
									Optional: Add a brief description of this
									workspace
								</FieldDescription>
							</Field>

							<Field>
								<Button
									type="submit"
									disabled={loading || !name.trim()}
									className="w-full"
								>
									{loading
										? "Creating Workspace..."
										: "Create Workspace"}
								</Button>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}

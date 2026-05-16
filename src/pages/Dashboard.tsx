import { useEffect, useState } from "react"
import Layout from "@/components/layout"
import NewEmpty from "@/components/NewEmpty"
import ChatUi from "@/components/chat/ChatUi"

import { useAuth } from "@/hooks/useAuth"
import {
	userHasWorkspace,
	createUserProfile,
	getUserWorkspaces,
} from "@/services/userService"
import { type Workspace } from "@/types/database"

export default function Dashboard() {
	const { user, loading } = useAuth()
	const [hasWorkspace, setHasWorkspace] = useState(false)
	const [workspaces, setWorkspaces] = useState<Workspace[]>([])
	const [checking, setChecking] = useState(true)

	useEffect(() => {
		if (!user) {
			setChecking(false)
			return
		}

		// Check if user has workspace and fetch them
		const checkWorkspace = async () => {
			try {
				// Create profile if it doesn't exist (don't await, let it happen in background)
				createUserProfile(user).catch(() => {
					// Profile might already exist, that's fine
				})

				// Check if user has workspace
				const result = await userHasWorkspace(user.uid)
				setHasWorkspace(result)
				console.log("Has workspace:", result) // Debug

				// Fetch user's workspaces
				if (result) {
					const workspacesResponse = await getUserWorkspaces(user.uid)
					if (workspacesResponse.success && workspacesResponse.data) {
						setWorkspaces(workspacesResponse.data)
					}
				}
			} catch (err) {
				console.error("Error checking workspace:", err)
				setHasWorkspace(false)
			} finally {
				setChecking(false)
			}
		}

		checkWorkspace()
	}, [user])

	if (loading || checking) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				Loading...
			</div>
		)
	}

	return (
		<>
			{hasWorkspace ? (
				<Layout workspaces={workspaces} children={<ChatUi />} />
			) : (
				<div className="flex h-screen items-center justify-center text-center">
					<div>
						<h1 className="text-2xl font-bold">
							Welcome to Slackity,{" "}
							{user?.displayName?.split(" ")[0]}!
						</h1>
						<NewEmpty />
					</div>
				</div>
			)}
		</>
	)
}

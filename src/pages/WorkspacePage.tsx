import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/firebase"
import Layout from "@/components/layout"
import ChatUi from "@/components/chat/ChatUi"
import { type Workspace } from "@/types/database"

export default function WorkspacePage() {
	const { workspaceId } = useParams<{ workspaceId: string }>()
	const [workspace, setWorkspace] = useState<Workspace | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (!workspaceId) return

		const fetchWorkspace = async () => {
			try {
				const workspaceRef = doc(db, "workspaces", workspaceId)
				const workspaceSnap = await getDoc(workspaceRef)

				if (workspaceSnap.exists()) {
					setWorkspace({
						id: workspaceSnap.id,
						...workspaceSnap.data(),
					} as Workspace)
				}
			} catch (error) {
				console.error("Error fetching workspace:", error)
			} finally {
				setLoading(false)
			}
		}

		fetchWorkspace()
	}, [workspaceId])

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				Loading workspace...
			</div>
		)
	}

	if (!workspace) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				Workspace not found
			</div>
		)
	}

	return (
		<Layout workspaceId={workspaceId} workspaceName={workspace.name}>
			<ChatUi />
		</Layout>
	)
}

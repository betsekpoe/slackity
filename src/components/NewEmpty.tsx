import { Building2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty"

export default function EmptyDemo() {
	const handleCreateWorkspace = () => {
		// Logic to create a new workspace
		console.log("Create Workspace clicked")
	}

	const handleJoinWorkspace = () => {
		// Logic to join an existing workspace
		console.log("Join Workspace clicked")
	}

	return (
		<Empty>
			<EmptyHeader>
				<EmptyTitle className="flex items-center gap-2">
					<EmptyMedia variant="icon">
						<Building2 />
					</EmptyMedia>{" "}
					No Workspaces Yet
				</EmptyTitle>
				<EmptyDescription>
					You are not in any workspace yet. Get started by creating
					your first workspace, or join an existing one.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent className="flex-row justify-center gap-2">
				<Button onClick={handleCreateWorkspace}>Create Workspace</Button>
				<Button variant="outline" onClick={handleJoinWorkspace}>
					Join Workspace
				</Button>
			</EmptyContent>
			<Button
				variant="link"
				asChild
				className="text-muted-foreground"
				size="sm"
			></Button>
		</Empty>
	)
}

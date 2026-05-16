import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { type Workspace } from "@/types/database"

export default function Layout({
	children,
	workspaceName,
	workspaceId,
	workspaces,
}: {
	children: React.ReactNode
	workspaceName?: string
	workspaceId?: string
	workspaces?: Workspace[]
}) {
	return (
		<SidebarProvider defaultOpen={true}>
			<AppSidebar
				workspaceName={workspaceName}
				workspaceId={workspaceId}
				workspaces={workspaces}
			/>
			<main className="w-full">
				<SidebarTrigger />
				{children}
			</main>
		</SidebarProvider>
	)
}

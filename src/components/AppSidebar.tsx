import { useAuth } from "@/hooks/useAuth"
import Logout from "@/components/auth/Logout"

import {
	Sidebar,
	SidebarHeader,
	SidebarContent,
	SidebarFooter,
} from "@/components/ui/sidebar"

export function AppSidebar() {
	const { user } = useAuth()

	return (
		<Sidebar variant="floating">
			<SidebarHeader></SidebarHeader>

			<SidebarContent></SidebarContent>

			<SidebarFooter className="display-flex flex-col gap-2">
				<span>{user?.displayName}</span>
				<span className="text-sm text-muted-foreground">
					{user?.email}
				</span>
				{user && <Logout />}
			</SidebarFooter>
		</Sidebar>
	)
}

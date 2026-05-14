import { useAuth } from "@/hooks/useAuth"
import Logout from "@/components/auth/Logout"
import { Users } from "lucide-react"

import {
	Sidebar,
	SidebarHeader,
	SidebarContent,
	SidebarFooter,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"

export function AppSidebar() {
	const { user } = useAuth()

	return (
		<Sidebar variant="floating">
			<SidebarHeader></SidebarHeader>

			<SidebarContent></SidebarContent>

			<SidebarFooter className="display-flex flex-col gap-2">
				{/* <div>
					<Button variant="default" size="lg" className="w-full btn">
						<Users />
						Create Channel
					</Button>
				</div> */}
				<hr />
				<span>{user?.displayName}</span>
				<span className="text-sm text-muted-foreground">
					{user?.email}
				</span>
				{user && <Logout />}
			</SidebarFooter>
		</Sidebar>
	)
}

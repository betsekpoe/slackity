import { useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import Logout from "@/components/auth/Logout"
import { Users, Briefcase } from "lucide-react"
import { useEffect, useState } from "react"
import { getUserProfile } from "@/services/userService"
import { type UserProfile, type Workspace } from "@/types/database"

import {
	Sidebar,
	SidebarHeader,
	SidebarContent,
	SidebarFooter,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"

export function AppSidebar({
	workspaceName,
	workspaceId,
	workspaces = [],
}: {
	workspaceName?: string
	workspaceId?: string
	workspaces?: Workspace[]
}) {
	const { user } = useAuth()
	const navigate = useNavigate()
	const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (!user?.uid) return

		const fetchProfile = async () => {
			const response = await getUserProfile(user.uid)
			if (response.success) {
				setUserProfile(response.data || null)
			}
			setLoading(false)
		}

		fetchProfile()
	}, [user?.uid])

	const handleWorkspaceClick = (wsId: string) => {
		navigate(`/workspaces/${wsId}`)
	}

	if (loading) return <div>Loading...</div>

	return (
		<Sidebar variant="floating">
			<SidebarHeader>
				{workspaceName ? (
					<div className="flex items-center gap-2">
						<Briefcase className="w-5 h-5" />
						<h2 className="font-bold text-lg">{workspaceName}</h2>
					</div>
				) : (
					<div className="flex items-center gap-2">
						<Briefcase className="w-5 h-5" />
						<h2 className="font-bold">Workspaces</h2>
					</div>
				)}
			</SidebarHeader>

			<SidebarContent>
				{workspaces && workspaces.length > 0 && (
					<div className="space-y-2 px-2">
						<p className="text-xs font-semibold text-gray-500 uppercase">
							Your Workspaces
						</p>
						{workspaces.map((ws) => (
							<button
								key={ws.id}
								onClick={() => handleWorkspaceClick(ws.id)}
								className={`w-full text-left px-3 py-2 rounded transition-colors ${
									workspaceId === ws.id
										? "bg-primary text-primary-foreground"
										: "hover:bg-gray-100 dark:hover:bg-gray-800"
								}`}
								title={ws.description || ws.name}
							>
								<div className="flex items-center gap-2">
									<span className="truncate text-sm">
										{ws.name}
									</span>
								</div>
							</button>
						))}
					</div>
				)}
			</SidebarContent>

			<SidebarFooter className="display-flex flex-col gap-2">
				<div>
					<Button variant="default" size="lg" className="w-full btn">
						<Users />
						Create Channel
					</Button>
				</div>
				<hr />
				{userProfile?.photoURL && (
					<img
						src={userProfile.photoURL}
						alt="Profile"
						className="w-8 h-8 rounded-full"
					/>
				)}
				<span>{userProfile?.displayName}</span>
				<span className="text-sm text-muted-foreground">
					{userProfile?.email}
				</span>
				{user && <Logout />}
			</SidebarFooter>
		</Sidebar>
	)
}

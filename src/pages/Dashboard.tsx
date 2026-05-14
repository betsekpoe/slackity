import { useAuth } from "@/hooks/useAuth"
import Logout from "@/components/Logout"

export default function Dashboard() {
	const { user } = useAuth()

	return (
		<div className="min-h-screen">
			<nav className="border-gray-200 p-4 ">
				<div className="flex justify-between items-center max-w-7xl mx-auto">
					<h1 className="text-2xl font-bold">
						Welcome, {user?.displayName}
					</h1>
					<div className="flex items-center gap-4">
						<span className="text-sm text-gray-600">
							{user?.email}
						</span>
						<Logout />
					</div>
				</div>
				<hr className="mt-4"/>
			</nav>

			<main className="p-4">
				{/* Task management UI will go here */}
				<p>Tasks coming soon...</p>
			</main>
		</div>
	)
}

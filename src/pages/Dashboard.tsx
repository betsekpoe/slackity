import Layout from "@/components/layout"
import NewEmpty from "@/components/NewEmpty"
import ChatUi from "@/components/chat/ChatUi"

import { useAuth } from "@/hooks/useAuth"

export default function Dashboard() {
	const { user } = useAuth()

	const isNewUser = true

	return (
		<>
			{isNewUser ? (
				<div className="flex h-screen items-center justify-center text-center">
					<div>
						<h1 className="text-2xl font-bold">
							Welcome to Slackity, {user?.displayName?.split(" ")[0]}!
						</h1>
						<NewEmpty />
					</div>
				</div>
			) : (
				<div>
					<Layout children={<ChatUi />} />
				</div>
			)}
		</>
	)
}

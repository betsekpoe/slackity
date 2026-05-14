import Layout from "@/components/layout"
import ChatUi from "@/components/chat/ChatUi"

export default function Dashboard() {
	return (
		<div className="min-h-screen">
			<Layout children={<ChatUi />} />
		</div>
	)
}

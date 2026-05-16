import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useAuth } from "./hooks/useAuth"
import LoginPage from "./pages/LoginPage"
import Dashboard from "./pages/Dashboard"
import WorkspacePage from "./pages/WorkspacePage"

function App() {
	const { user, loading } = useAuth()

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<p>Loading...</p>
			</div>
		)
	}

	if (!user) return <LoginPage />

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route
					path="/workspaces/:workspaceId"
					element={<WorkspacePage />}
				/>
			</Routes>
		</BrowserRouter>
	)
}

export default App

import { useAuth } from "./hooks/useAuth"
import LoginPage from "./pages/LoginPage"
import Dashboard from "./pages/Dashboard"

function App() {
    const { user, loading } = useAuth()

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Loading...</p>
            </div>
        )
    }

    return user ? <Dashboard /> : <LoginPage />
}

export default App

import { useAuth } from "../hooks/useAuth"

export default function AuthStatus() {
	const { user, loading } = useAuth()

	if (loading) {
		return <p>Loading...</p>
	}

	return (
		<div>
			{user ? (
				<p>Logged in as {user.displayName || user.email}</p>
			) : (
				<p>You are not logged in.</p>
			)}
		</div>
	)
}

import { useState } from "react"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/firebase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
	Field,
	FieldLabel,
	FieldGroup,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function ForgotPasswordForm() {
	const [email, setEmail] = useState("")
	const [message, setMessage] = useState("")
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)

	const handleReset = async (e: React.FormEvent) => {
		e.preventDefault()
		setError("")
		setMessage("")
		setLoading(true)

		try {
			await sendPasswordResetEmail(auth, email)
			setMessage("Password reset email sent! Check your inbox.")
			setEmail("")
		} catch (err: any) {
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Reset Password</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleReset}>
					<FieldGroup>
						<Field>
							<FieldLabel htmlFor="reset-email">Email</FieldLabel>
							<Input
								id="reset-email"
								type="email"
								placeholder="m@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</Field>
						{error && (
							<p className="text-red-600 text-sm">{error}</p>
						)}
						{message && (
							<p className="text-green-600 text-sm">{message}</p>
						)}
						<Button type="submit" disabled={loading}>
							{loading ? "Sending..." : "Send Reset Email"}
						</Button>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	)
}

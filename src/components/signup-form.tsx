import { useState } from "react"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../firebase"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function SignupForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [displayName, setDisplayName] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)

	const validateForm = () => {
		if (!displayName.trim()) {
			setError("Name is required")
			return false
		}
		if (!email.includes("@")) {
			setError("Please enter a valid email")
			return false
		}
		if (password.length < 6) {
			setError("Password must be at least 6 characters")
			return false
		}
		if (password !== confirmPassword) {
			setError("Passwords do not match")
			return false
		}
		return true
	}

	const matchedPassword = password === confirmPassword

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault()
		setError("") // Clear previous errors

		if (!validateForm()) {
			return
		}

		setLoading(true)
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			)
			await updateProfile(userCredential.user, { displayName })
			console.log("User registered:", userCredential.user)
		} catch (err: any) {
			const errorMessage =
				err.code === "auth/email-already-in-use"
					? "Email already registered"
					: err.message
			setError(errorMessage)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className={cn("flex flex-col gap-6 p-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle>Create an account</CardTitle>
					<CardDescription>
						Enter your information below to create your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					{error && (
						<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
							{error}
						</div>
					)}
					<form onSubmit={handleRegister}>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="name">Full Name</FieldLabel>
								<Input
									value={displayName}
									onChange={(e) => setDisplayName(e.target.value)}
									id="name"
									type="text"
									placeholder="John Doe"
									required
								/>
							</Field>
							<Field>
								<FieldLabel htmlFor="email">Email</FieldLabel>
								<Input
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									id="email"
									type="email"
									placeholder="m@example.com"
									required
								/>
								<FieldDescription>
									We&apos;ll use this to contact you. We will not
									share your email with anyone else.
								</FieldDescription>
							</Field>
							<Field>
								<FieldLabel htmlFor="password">Password</FieldLabel>
								<Input
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									id="password"
									type="password"
									required
								/>
								<FieldDescription>
									Must be at least 6 characters long.
								</FieldDescription>
							</Field>
							<Field>
								<FieldLabel htmlFor="confirm-password">
									Confirm Password
								</FieldLabel>
								<Input
									value={confirmPassword}
									onChange={(e) =>
										setConfirmPassword(e.target.value)
									}
									id="confirm-password"
									type="password"
									required
								/>
								<FieldDescription>
									Please confirm your password.
								</FieldDescription>
							</Field>
							<FieldGroup>
								<Button
									type="submit"
									disabled={loading || !matchedPassword}
								>
									{loading ? "Creating account..." : "Sign up"}
								</Button>
								<Button
									variant="outline"
									type="button"
								>
									Sign up with Google
								</Button>
								<FieldDescription className="px-6 text-center">
									Already have an account?{" "}
									<a href="/sign-in">Sign in</a>
								</FieldDescription>
							</FieldGroup>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}

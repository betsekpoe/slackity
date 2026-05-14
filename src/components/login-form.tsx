import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"

import { GoogleSignIn } from "./GoogleSignIn"
import { ForgotPasswordForm } from "./ForgotPasswordForm"

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

export default function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [showReset, setShowReset] = useState(false)

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password,
			)
			console.log("User logged in:", userCredential.user)
		} catch (error) {
			console.error("Error logging in:", error)
		}
	}

	return (
		<div className={cn("flex flex-col gap-6 p-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle>Login to your account</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleLogin}>
						<FieldGroup>
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
							</Field>
							<Field>
								<div className="flex items-center">
									<FieldLabel htmlFor="password">
										Password
									</FieldLabel>
									{showReset ? (
										<ForgotPasswordForm />
									) : (
										<a
											href="#"
											onClick={(e) => {
												e.preventDefault()
												setShowReset(true)
											}}
											className="text-sm underline-offset-4 hover:underline"
										>
											Forgot your password?
										</a>
									)}
								</div>
								<Input
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									id="password"
									type="password"
									required
								/>
							</Field>
							<Field>
								<Button className="btn" type="submit">
									Login
								</Button>
								<GoogleSignIn />
								<FieldDescription className="text-center">
									Don't have an account?{" "}
									<a href="/sign-up">Sign up</a>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}

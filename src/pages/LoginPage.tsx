import { useState } from "react"

import LoginForm from "@/components/auth/LoginForm"
import SignupForm from "@/components/auth/SignupForm"

export default function LoginPage() {
	const [isLogin, setIsLogin] = useState(true)

	return (
		<div className="flex flex-col gap-4 items-center justify-center min-h-screen">
			<h1 className="text-3xl font-bold">Slackity</h1>

			{isLogin ? (
				<div className="w-full max-w-md">
					<LoginForm />
					<p className="text-center text-sm mt-4">
						Don't have an account?{" "}
						<button
							onClick={() => setIsLogin(false)}
							className="underline text-(--primary) hover:text-blue-800"
						>
							Sign up
						</button>
					</p>
				</div>
			) : (
				<div className="w-full max-w-md">
					<SignupForm />
					<p className="text-center text-sm mt-4">
						Already have an account?{" "}
						<button
							onClick={() => setIsLogin(true)}
							className="underline text-(--primary) hover:text-blue-800"
						>
							Log in
						</button>
					</p>
				</div>
			)}
		</div>
	)
}

import { useState } from "react"
import { useParams } from "react-router"

import LoginForm from "@/components/login-form"
import SignupForm from "@/components/signup-form"

export default function LoginPage() {
	const [isLogin, setIsLogin] = useState(false)

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
							className="underline text-blue-600 hover:text-blue-800"
						>
							Sign up
						</button>
					</p>
				</div>
			) : (
				<div className="w-full max-w-md">
					<SignupForm />
				</div>  
			)}
		</div>
	)
}

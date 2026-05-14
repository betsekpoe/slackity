import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "@/firebase"
import { Button } from "@/components/ui/button"

export function GoogleSignIn() {
	const handleGoogleSignIn = async () => {
		try {
			const provider = new GoogleAuthProvider()
			const result = await signInWithPopup(auth, provider)
			console.log("User signed in with Google:", result.user)
		} catch (error: any) {
			console.error("Google sign-in error:", error.message)
		}
	}

	return (
		<Button
			variant="outline"
			type="button"
			onClick={handleGoogleSignIn}
			className="w-full"
		>
			Sign in with Google
		</Button>
	)
}

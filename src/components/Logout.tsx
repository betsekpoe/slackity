import { signOut } from "firebase/auth"
import { auth } from "@/firebase"
import { Button } from "@/components/ui/button"

export default function Logout() {
    const handleLogout = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.error("Error logging out:", error)
        }
    }

    return (
        <Button variant="outline" onClick={handleLogout}>
            Logout
        </Button>
    )
}
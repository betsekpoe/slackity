import {
	doc,
	getDoc,
	setDoc,
	updateDoc,
	arrayUnion,
	collection,
	query,
	where,
	getDocs,
} from "firebase/firestore"
import { db } from "@/firebase"
import { type User as FirebaseUser } from "firebase/auth"
import {
	type UserProfile,
	type Workspace,
	type ApiResponse,
} from "@/types/database"
import { Timestamp } from "firebase/firestore"

/**
 * Get user's profile from Firestore
 */
export async function getUserProfile(
	userId: string,
): Promise<ApiResponse<UserProfile>> {
	try {
		const userDocRef = doc(db, "users", userId)
		const userDocSnap = await getDoc(userDocRef)

		if (!userDocSnap.exists()) {
			return { success: false, error: "User profile not found" }
		}

		return {
			success: true,
			data: { id: userDocSnap.id, ...userDocSnap.data() } as UserProfile,
		}
	} catch (error: any) {
		return { success: false, error: error.message }
	}
}

/**
 * Create user profile when they sign up
 */
export async function createUserProfile(
	firebaseUser: FirebaseUser,
): Promise<ApiResponse<UserProfile>> {
	try {
		// Check if profile already exists
		const existingProfile = await getUserProfile(firebaseUser.uid)
		if (existingProfile.success && existingProfile.data) {
			// Profile already exists, return it
			return existingProfile
		}

		const userProfile: UserProfile = {
			id: firebaseUser.uid,
			email: firebaseUser.email || "",
			displayName: firebaseUser.displayName || "",
			photoURL: firebaseUser.photoURL,
			createdAt: Timestamp.now(),
			workspaceIds: [],
		}

		// Use merge: true to not overwrite existing fields
		await setDoc(doc(db, "users", firebaseUser.uid), userProfile, {
			merge: true,
		})
		return { success: true, data: userProfile }
	} catch (error: any) {
		console.error("Error creating user profile:", error)
		return { success: false, error: error.message }
	}
}

/**
 * Check if user has any workspaces
 */
export async function userHasWorkspace(userId: string): Promise<boolean> {
	try {
		const userProfile = await getUserProfile(userId)

		if (!userProfile.success || !userProfile.data) {
			return false
		}

		return userProfile.data.workspaceIds.length > 0
	} catch (error) {
		console.error("Error checking workspace:", error)
		return false
	}
}

/**
 * Get all workspaces for a user
 */
export async function getUserWorkspaces(
	userId: string,
): Promise<ApiResponse<Workspace[]>> {
	try {
		const userProfile = await getUserProfile(userId)

		if (!userProfile.success || !userProfile.data) {
			return { success: false, error: "User profile not found" }
		}

		if (userProfile.data.workspaceIds.length === 0) {
			return { success: true, data: [] }
		}

		// Fetch all workspaces for this user
		const workspacesRef = collection(db, "workspaces")
		const q = query(
			workspacesRef,
			where("__name__", "in", userProfile.data.workspaceIds),
		)
		const querySnapshot = await getDocs(q)

		const workspaces: Workspace[] = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		})) as Workspace[]

		return { success: true, data: workspaces }
	} catch (error: any) {
		return { success: false, error: error.message }
	}
}

/**
 * Add workspace to user's workspaceIds
 */
export async function addWorkspaceToUser(
	userId: string,
	workspaceId: string,
): Promise<ApiResponse<void>> {
	try {
		const userDocRef = doc(db, "users", userId)
		await updateDoc(userDocRef, {
			workspaceIds: arrayUnion(workspaceId),
		})
		return { success: true }
	} catch (error: any) {
		return { success: false, error: error.message }
	}
}

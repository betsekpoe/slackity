import { Timestamp } from "firebase/firestore"

// ============ User & Profile Types ============
export interface UserProfile {
	id: string
	email: string
	displayName: string
	photoURL: string | null
	createdAt: Timestamp
	workspaceIds: string[]
}

// ============ Workspace Types ============
export type UserRole = "owner" | "admin" | "member"

export interface WorkspaceMember {
	userId: string
	role: UserRole
	joinedAt: Timestamp
}

export interface Workspace {
	id: string
	name: string
	description: string
	ownerId: string
	members: WorkspaceMember[]
	createdAt: Timestamp
	settings?: {
		isPublic?: boolean
		allowPublicChannels?: boolean
	}
}

// ============ Channel Types ============
export interface Channel {
	id: string
	name: string
	description: string
	workspaceId: string
	isPrivate: boolean
	members: string[] // user IDs
	createdBy: string
	createdAt: Timestamp
	updatedAt: Timestamp
}

// ============ Task Types ============
export type TaskStatus = "todo" | "in-progress" | "done"
export type TaskPriority = "low" | "medium" | "high"

export interface Task {
	id: string
	title: string
	description: string
	channelId: string
	workspaceId: string
	status: TaskStatus
	priority: TaskPriority
	assignees: string[] // user IDs
	dueDate: Timestamp | null
	createdBy: string
	createdAt: Timestamp
	updatedAt: Timestamp
	commentCount?: number
}

// ============ Comment Types ============
export interface TaskComment {
	id: string
	text: string
	authorId: string
	taskId: string
	createdAt: Timestamp
	edited: boolean
	editedAt?: Timestamp
}

// ============ API Response Types ============
export interface ApiResponse<T> {
	success: boolean
	data?: T
	error?: string
}

export interface PaginatedResponse<T> {
	items: T[]
	total: number
	hasMore: boolean
	cursor?: string
}

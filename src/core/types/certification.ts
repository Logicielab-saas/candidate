export interface Certification {
	id: string
	name: string
	organization: string
	issueDate: string
	expiryDate?: string
	credentialId?: string
	credentialUrl?: string
}
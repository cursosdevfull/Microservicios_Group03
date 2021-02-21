export interface RepositoryQueue {
	sendError(message: any): void;
	sendMessage(message: any): void;
	receiveMessage(callback: any): void;
}

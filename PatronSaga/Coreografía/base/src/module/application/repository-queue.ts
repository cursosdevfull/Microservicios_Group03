export interface RepositoryQueue {
	sendMessage(message: any): void;
	receiveMessage(callback: any): void;
}

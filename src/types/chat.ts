export type AllChats = ChatType[];

export interface ChatType {
	id: string;
	title: string;
	createdAt: string;
	updatedAt: string;
	messages: [];
	options: {
		isAzure: boolean;
		model: string;
		debugMode: boolean;
		maxTokens: number | null;
		contextWindow: number | null;
	};
}

export interface Note {
    id: string;
    title: string;
    content: string;
    updatedAt: Date;
    deletedAt?: Date
}

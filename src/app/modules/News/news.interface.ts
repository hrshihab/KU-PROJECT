export type INews = {
    title: string;
    description: string;
    imageUrl?: string | null;
    date: Date;
    createdBy: string;
}
export type INewsFilterRequest = {
    searchTerm?: string;
    title?: string;
    description?: string;

}

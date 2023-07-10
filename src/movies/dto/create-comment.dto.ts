export class CreateCommentDto {
  movieId: string;
  purchaseId: string;
  userId: string;
  rate?: number = 0;
  comment?: string;
}

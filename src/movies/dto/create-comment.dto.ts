export class CreateCommentDto {
  movieId: string;
  purchaseId: string;
  userId: string;
  rate: number;
  comment?: string;
}

export interface Comment {
  _id: string;
  userId: string;
  videoId: string;
  description: string;
  likes: string[];
  createdAt: Date;
  updatedAt: Date;
}

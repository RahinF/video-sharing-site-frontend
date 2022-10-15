export interface Video {
  _id: string;
  userId: string;
  title: string;
  description: string;
  duration: number;
  imageUrl: string;
  videoUrl: string;
  views: number;
  tags: string[];
  likes: string[];
  createdAt: Date;
  updatedAt: Date;
}

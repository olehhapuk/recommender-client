import { Tag } from './tag.entity';
import { User } from './user.entity';

export interface Video {
  id: number;
  createdAt: string;
  updatedAt: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  views: number;
  tags: Tag[];
  likedBy: User[];
  author: User;
}

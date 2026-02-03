import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  status: 'draft' | 'published';
  publishedAt?: Date;
  heroImage?: string;
  readingTime: number;
  likeCount: number;
  commentCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    publishedAt: { type: Date },
    heroImage: { type: String },
    readingTime: { type: Number, default: 0 },
    likeCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IPost>('Post', PostSchema);

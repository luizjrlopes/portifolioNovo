import { Schema, models, model } from "mongoose";

export interface Article {
  id: string;
  title: string;
  summary?: string;
  content?: string;
  pdfPath?: string;
  tags?: string[];
  createdAt?: Date;
}

const articleSchema = new Schema<Article>(
  {
    id: { type: String, unique: true, index: true },
    title: String,
    summary: String,
    content: String,
    pdfPath: String,
    tags: [String],
  },
  { timestamps: true }
);

export default models.Article || model<Article>("Article", articleSchema);

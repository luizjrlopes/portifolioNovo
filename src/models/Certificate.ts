import { Schema, models, model } from "mongoose";

export interface Certificate {
  id: string;
  title: string;
  org: string;
  issueDate: string;
  verifyUrl?: string;
  imagePath: string;
  tags?: string[];
}

const certificateSchema = new Schema<Certificate>(
  {
    id: { type: String, unique: true, index: true },
    title: String,
    org: String,
    issueDate: String,
    verifyUrl: String,
    imagePath: String,
    tags: [String],
  },
  { timestamps: true }
);

export default models.Certificate || model<Certificate>("Certificate", certificateSchema);

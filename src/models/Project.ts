import { Schema, models, model } from "mongoose";

export interface Project {
  id: string;
  title: string;
  description?: string;
  repoUrl?: string;
  liveUrl?: string;
  imagePath?: string;
  tags?: string[];
}

const projectSchema = new Schema<Project>(
  {
    id: { type: String, unique: true, index: true },
    title: String,
    description: String,
    repoUrl: String,
    liveUrl: String,
    imagePath: String,
    tags: [String],
  },
  { timestamps: true }
);

export default models.Project || model<Project>("Project", projectSchema);

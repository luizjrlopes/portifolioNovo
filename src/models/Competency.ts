import mongoose, { Schema, Document, models } from "mongoose";

export interface ICompetency extends Document {
  category: string;
  subCategory: string;
  title: string;
  items: string[];
  chips: string[];
}

const CompetencySchema: Schema = new Schema({
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  title: { type: String, required: true },
  items: [{ type: String }],
  chips: [{ type: String }],
});

export default models.Competency ||
  mongoose.model<ICompetency>("Competency", CompetencySchema);

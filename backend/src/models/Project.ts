import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  slug: string;
  title: string;
  summary: string;
  description: string;
  techStack: string[];
  role: string;
  links: {
    demoUrl?: string;
    repoUrl?: string;
  };
  isFeatured: boolean;
  visibility: "public" | "email_gated";
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    description: { type: String, required: true },
    techStack: { type: [String], default: [] },
    role: { type: String, required: true },
    links: {
      demoUrl: { type: String },
      repoUrl: { type: String },
    },
    isFeatured: { type: Boolean, default: false },
    visibility: {
      type: String,
      enum: ["public", "email_gated"],
      default: "public",
    },
    category: {
      type: String,
      enum: ["systems", "tools", "experiments"],
      default: "experiments",
    },
  },
  { timestamps: true },
);

export default mongoose.model<IProject>("Project", ProjectSchema);

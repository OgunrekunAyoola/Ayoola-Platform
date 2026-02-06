import mongoose, { Schema, Document } from 'mongoose';

export interface IOutreachTarget extends Document {
  name: string;
  email: string;
  company: string;
  segment: 'UK Service Businesses' | 'Design & Brand Agencies' | 'AI-Adjacent Founders' | 'Other';
  templateUsed?: string;
  status: 'Pending' | 'Sent' | 'Replied' | 'Converted' | 'Rejected';
  lastContactedAt?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OutreachTargetSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    company: { type: String, required: true },
    segment: { 
      type: String, 
      enum: ['UK Service Businesses', 'Design & Brand Agencies', 'AI-Adjacent Founders', 'Other'],
      required: true 
    },
    templateUsed: { type: String },
    status: { 
      type: String, 
      enum: ['Pending', 'Sent', 'Replied', 'Converted', 'Rejected'],
      default: 'Pending'
    },
    lastContactedAt: { type: Date },
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IOutreachTarget>('OutreachTarget', OutreachTargetSchema);

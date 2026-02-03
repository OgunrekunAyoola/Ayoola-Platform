import mongoose, { Schema, Document } from 'mongoose';

export interface ISubscriber extends Document {
  email: string;
  source: 'comment' | 'like' | 'gated_case_study' | 'newsletter_form';
  createdAt: Date;
  updatedAt: Date;
}

const SubscriberSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    source: {
      type: String,
      enum: ['comment', 'like', 'gated_case_study', 'newsletter_form'],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ISubscriber>('Subscriber', SubscriberSchema);

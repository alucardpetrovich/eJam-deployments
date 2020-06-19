import mongoose, { Schema, Document } from "mongoose";

const deploymentsSchema = new Schema({
  url: { type: String, required: true },

  templateName: { type: String, required: true },

  version: { type: String, required: true },

  deployedAt: {
    type: String,
    required: true,
    default: () => new Date(),
  },
});

export interface Deployment extends Document {
  url: string;
  templateName: string;
  version: string;
  deployedAt?: Date;
}

export const Deployment = mongoose.model<Deployment>(
  "Deployment",
  deploymentsSchema
);

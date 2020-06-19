import mongoose, { Schema, Document } from "mongoose";

export interface Template extends Document {
  name: string;
  versions: string[];
}

const templateSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  versions: [
    {
      type: String,
      required: true,
    },
  ],
});

export const Template = mongoose.model<Template>("Template", templateSchema);

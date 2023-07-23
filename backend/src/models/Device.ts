import { Schema, model } from "mongoose";

export interface deviceType {
  name: string;
  lastActivity: Date;
  objDistance: string;
}

const userSchema = new Schema<deviceType>(
  {
    name: {
      type: String,
      required: true,
    },
    lastActivity: Date,
    objDistance: String,
  },
  { timestamps: true }
);

const Device = model<deviceType>("device", userSchema);

export default Device;

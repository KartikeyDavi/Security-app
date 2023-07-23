import { Schema, model } from "mongoose";

export interface deviceType {
  name: string;
  dId:string;
  lastActivity: Date;
  objDistance: string;
}

const userSchema = new Schema<deviceType>(
  {
    dId: {
      type: String,
      required: true,
    },
    lastActivity: {
      type:Date,
      default:new Date(Date.now())
    },
    objDistance: {
      type:String,
      default:"0"
    },
  },
  { timestamps: true }
);

const Device = model<deviceType>("device", userSchema);

export default Device;

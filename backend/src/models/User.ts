import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

export interface userType {
  name: string;
  email: string;
  password: string;
  devices?: string[] | [];
}

const strType = {
  type: String,
  required: true,
};

const userSchema = new Schema<userType>({
  name: strType,
  email: strType,
  password: strType,
  devices: {
    type: [String],
    default: [],
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 4);
  next();
});

const USER = model<userType>("user", userSchema);

export default USER;

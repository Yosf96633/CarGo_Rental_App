import { IUser } from "@/interface/interfaces";
import { Schema, model, models } from "mongoose";
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const userModel = models.User || model<IUser>("User", userSchema);
export default userModel;

import { IUser } from "@/interface/interfaces";
import { Schema, model } from "mongoose";

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim:true,
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
  address: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
  },
  role: {
    type: String,
    enum: [`user`, `admin`],
    default: `user`,
  },
  isVerified: {
    type: Boolean,
    unique: true,
    default: false,
  },
} , {
  timestamps:true,
});
const userModel = model<IUser>("User", userSchema);
export default userModel;

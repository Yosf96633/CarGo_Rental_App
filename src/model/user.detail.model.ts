import { Schema, models, model } from "mongoose";
import { IDetail } from "@/interface/interfaces";

const detailSchema = new Schema<IDetail>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  address: {
    type: String,
    default: "",
  },
  profileImage: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const detailModel = models.Detail || model<IDetail>("Detail", detailSchema);
export default detailModel;

import { IReview } from "@/interface/interfaces";
import { Schema, model } from "mongoose";

const reviewSchema = new Schema<IReview>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  carId: {
    type: Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    default: 1,
  },
});

const reviewModel = model<IReview>('Review' , reviewSchema)
export default reviewModel;

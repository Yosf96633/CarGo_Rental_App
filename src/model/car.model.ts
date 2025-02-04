import { ICar, IUser } from "@/interface/interfaces";

import { Schema, model } from "mongoose";

const carSchema = new Schema<ICar>({
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  details: {
    manufacturer: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
  },
  pricePerDay: {
    type: Number,
    required: true,
  },
  availability: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 100,
  },
  mileage: {
    type: Number,
    required: true,
  },
  fuelType: {
    type: String,
    enum: [`Petrol`, `Diesel`, `Electric`, `Hybrid`],
    default: "Petrol",
  },
  images: [String],
} , {
  timestamps:true,
});

const carModel = model<ICar>("Car", carSchema);
export default carModel;

import { IRental } from "@/interface/interfaces";

import { Schema, model } from "mongoose";
const { Types } = Schema;
const { ObjectId } = Types;
const rentalSchema = new Schema<IRental>({
  userId: {
    type: ObjectId,
    ref: `User`,
    required: true,
  },
  ownerId: {
    type: ObjectId,
    ref: `User`,
    required: true,
  },
  carId: {
    type: ObjectId,
    ref: `Car`,
    required: true,
  },
  startDate: Date,
  endDate: Date,
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: [`pending`, `confirmed`, `canceled`, `completed`],
    default: "pending",
  },
  paymentStatus: {
    type: String,
    enum: [`unpaid`, `paid`, `refunded`],
    default: "unpaid",
  },
});

const rentalModel = model<IRental>("Rental", rentalSchema);
export default rentalModel;

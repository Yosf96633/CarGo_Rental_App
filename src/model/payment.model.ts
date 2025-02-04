import { IPayment } from "@/interface/interfaces";

import { Schema,model } from "mongoose";

const paymentSchema = new Schema<IPayment>({
  rentalId: {
    type: Schema.Types.ObjectId,
    ref: "Rental",
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
});

const paymentModel = model<IPayment>("Payment", paymentSchema);
export default paymentModel;

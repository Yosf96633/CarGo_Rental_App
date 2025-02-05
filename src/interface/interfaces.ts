import { Document, Types } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICar extends Document {
  ownerId: Types.ObjectId;
  details: {
    manufacturer: string;
    brand: string;
    year: number;
  };
  pricePerDay: number;
  availability: boolean;
  description: string;
  mileage: number;
  fuelType: `Petrol` | `Diesel` | `Electric` | `Hybrid`;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IRental extends Document {
  userId: Types.ObjectId;
  carId: Types.ObjectId;
  ownerId: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status: `pending` | `confirmed` | `canceled` | `completed`;
  paymentStatus: `unpaid` | `paid` | `refunded`;
  createdAt: Date;
  updatedAt: Date;
}
export interface IPayment extends Document {
  rentalId: Types.ObjectId;
  paymentMethod: string;
  transactionId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReview extends Document {
  userId: Types.ObjectId;
  carId: Types.ObjectId;
  ownerId: Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IDetail extends Document {
  userId: Types.ObjectId;
  profileImage: string;
  role: "user" | "admin";
  address: string;
}

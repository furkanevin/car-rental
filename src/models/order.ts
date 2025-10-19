import mongoose, { Schema } from "mongoose";

export interface IOrder {
  _id: string;
  product: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  totalAmount: number;
  currency: string;
  type: string;
  status: "pending" | "paid" | "cancelled";
  rental: {
    pickupDate: Date;
    returnDate: Date;
    pickupTime: string;
    returnTime: string;
    pickupLocation: string;
    dropoffLocation: string;
    additionalNotes?: string;
    days: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "cancelled"],
      default: "pending",
    },
    rental: {
      pickupDate: {
        type: Date,
        required: true,
      },
      returnDate: {
        type: Date,
        required: true,
      },
      pickupTime: {
        type: String,
        required: true,
      },
      returnTime: {
        type: String,
        required: true,
      },
      pickupLocation: {
        type: String,
        required: true,
      },
      dropoffLocation: {
        type: String,
        required: true,
      },
      additionalNotes: {
        type: String,
        required: false,
      },
      days: {
        type: Number,
        required: true,
      },
    },
  },
  { timestamps: true }
);

export const Order =
  mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema);

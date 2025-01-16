import mongoose from "mongoose";
let orderSchema = new mongoose.Schema(
  {
    items: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Products",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true
    },
  },
  { timestamps: true }
);
export const orderModel = mongoose.model("orders", orderSchema);

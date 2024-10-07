const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema(
  {
    accountId: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: Object, required: true },
    products: [
      {
        productId: { type: Object },
      },
    ],
    amount: { type: Number, required: true },

    status: {
      type: String,
      enum: ["Cancelled", "To Ship", "Shipped", "Delivered"],
      default: "To Ship",
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);

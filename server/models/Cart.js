const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema(
  {
    accountId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        //quantity
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },

  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);

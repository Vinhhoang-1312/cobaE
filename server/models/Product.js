const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: Array, required: true },
    country: { type: Array, required: true },
    quantity: { type: Number },
    status: { type: Boolean, default: true },
    image: { type: Array, required: true },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);

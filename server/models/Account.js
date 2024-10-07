const mongoose = require("mongoose");
const AccoutSchema = new mongoose.Schema(
  {
    gmail: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    phone: { type: Number, required: true, unique: true },
    fullname: { type: String, required: true },
    //  wishlist: {
    //    type:Array
    //  },
    image: { type: String },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Account", AccoutSchema);

import mongoose from "mongoose";

const signupTemplate = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

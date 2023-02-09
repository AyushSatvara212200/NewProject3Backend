const mongoose = require("mongoose");
// const moment = require("moment");

const EntriesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: "userId is required",
    },
    name: {
      type: String,
      required: "Name is required",
      max: 255,
      default: "",
    },
    gender: {
      type: String,
      required: "gender is required",
      trim: true,
    },
    relation: {
      type: String,
      required: "relation is required",
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: "Your email is required",
      trim: true,
    },
    phone: {
      type: String,
      unique: true,
      required: "Your phone is required",
      trim: true,
    },
    address: {
      type: String,
      required: "Address is required",
      //   trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("nominee", EntriesSchema);

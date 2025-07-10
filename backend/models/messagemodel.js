const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: { type: String, required: true },
      avatar: { type: String, required: true },
    },
    message: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    imageUrl: String,
    pdfUrl: String,
    pdfName: String,
    system: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);

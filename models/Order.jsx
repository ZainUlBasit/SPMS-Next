const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  customerId: { type: mongoose.Types.ObjectId, ref: "Customer", required: true },
  date: { type: Number, default: Math.floor(Date.now() / 1000) },
  invoice_no: { type: Number, required: true },
  items: [
    {
      itemId: { type: mongoose.Types.ObjectId, ref: "Item", required: true },
      qty: { type: Number, required: true },
      price: { type: Number, required: true },
      purchase: { type: Number, required: true },
      amount: { type: Number, required: true },
    },
  ],
  discount: { type: Number, required: true, default: 0 },
  total_amount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["PENDING", "APPROVED", "REJECTED"],
    default: "PENDING",
  },
  approvedBy: { type: mongoose.Types.ObjectId, ref: "User" },
  approvedAt: { type: Number },
  rejectionReason: { type: String },
});

module.exports = mongoose.models.Order || mongoose.model("Order", OrderSchema);

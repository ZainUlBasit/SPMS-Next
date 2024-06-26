const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reqStr = {
  type: String,
  required: true,
};

const reqNum = {
  type: Number,
  required: true,
};

const StockSchema = new Schema({
  itemId: { type: mongoose.Types.ObjectId, ref: "Item" },
  companyId: { type: mongoose.Types.ObjectId, ref: "Company" },
  qty: reqNum,
  purchase: reqNum,
  total_amount: reqNum,
  invoice_no: reqStr,
  truck_no: reqStr,
  date: {
    type: Number,
    default: Math.floor(Date.now() / 1000),
  },
});

module.exports = mongoose.models.Stock || mongoose.model("Stock", StockSchema);

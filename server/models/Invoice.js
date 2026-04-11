import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: String,
  size: String,
  quantity: Number,
  price: Number,
  date: Date,
});

const invoiceSchema = new mongoose.Schema(
  {
    customerName: String,
    items: [itemSchema],
    totalAmount: Number,
    custmer_no: Number,
    advance: Number,
  },
  { timestamps: true },
);

export default mongoose.model("Invoice", invoiceSchema);

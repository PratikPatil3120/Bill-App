import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
});

const invoiceSchema = new mongoose.Schema(
  {
    customerName: String,
    items: [itemSchema],
    totalAmount: Number,
  },
  { timestamps: true },
);

export default mongoose.model("Invoice", invoiceSchema);

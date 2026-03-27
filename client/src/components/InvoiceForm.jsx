import { useState } from "react";
import API from "../services/api";

export default function InvoiceForm() {
  const [customerName, setCustomerName] = useState("");
  const [items, setItems] = useState([{ name: "", quantity: 1, price: 0 }]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalAmount = items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );

    await API.post("/invoices", {
      customerName,
      items,
      totalAmount,
    });

    alert("Invoice Created");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Customer Name"
        onChange={(e) => setCustomerName(e.target.value)}
      />
      <button type="submit">Save</button>
    </form>
  );
}

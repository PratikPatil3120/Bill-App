import { useState } from "react";
import API from "../services/api";
import { Button } from "react-bootstrap";

export default function InvoiceForm() {
  const [customerName, setCustomerName] = useState("");
  const [items, setItems] = useState([
    { name: "", size: "", quantity: "", price: "" },
  ]);

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
      <input
        placeholder="Item Name"
        onChange={(e) =>
          setItems((prev) => [{ ...prev[0], name: e.target.value }])
        }
      />
      <input
        placeholder="Size"
        onChange={(e) =>
          setItems((prev) => [{ ...prev[0], size: e.target.value }])
        }
      />
      <input
        placeholder="Quantity"
        onChange={(e) =>
          setItems((prev) => [{ ...prev[0], quantity: Number(e.target.value) }])
        }
      />
      <input
        placeholder="Price"
        onChange={(e) =>
          setItems((prev) => [{ ...prev[0], price: Number(e.target.value) }])
        }
      />
      s
      <Button size="sm" className="ms-3" type="submit">
        Save
      </Button>
    </form>
  );
}

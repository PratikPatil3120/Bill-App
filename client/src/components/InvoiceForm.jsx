import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import API from "../services/api";

export default function InvoiceForm({ onSuccess, formattedDate }) {
  const [customerName, setCustomerName] = useState("");
  const [customerNo, setCustomerNo] = useState("");
  const [addvancePayment, setAddvancePayment] = useState("");

  const [items, setItems] = useState([
    { name: "", quantity: 1, price: 0, date: new Date() },
  ]);

  // Handle item change
  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  // Add item
  const addItem = () => {
    setItems([
      ...items,
      { name: "", quantity: 1, price: 0, date: formattedDate },
    ]);
  };

  // Remove item
  const removeItem = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalAmount = items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );

    await API.post("/invoices", {
      customerName,
      custmer_no: customerNo,
      advance: addvancePayment,
      items,
      totalAmount,
    });

    alert("Invoice Created");

    // reset form
    setCustomerName("");
    setCustomerNo("");
    setItems([{ name: "", quantity: 1, price: 0 }]);

    onSuccess && onSuccess();
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Customer Name */}
      <Row>
        <Col>
          <Form.Label>Customer Name</Form.Label>
          <Form.Control
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type="text"
            value={customerNo}
            onChange={(e) => setCustomerNo(e.target.value)}
            required
          />
        </Col>
        <Col>
          <Form.Label>Advance Payment</Form.Label>
          <Form.Control
            type="text"
            value={addvancePayment}
            onChange={(e) => setAddvancePayment(e.target.value)}
            required
          />
        </Col>
      </Row>

      {/* Items Section */}
      <h5 className="mt-1">Items</h5>

      {items.map((item, index) => (
        <div key={index} className="d-flex gap-2 mb-2">
          <Form.Control
            placeholder="Item Name"
            value={item.name}
            onChange={(e) => handleItemChange(index, "name", e.target.value)}
          />

          <Form.Control
            type="number"
            placeholder="Qty"
            value={item.quantity}
            onChange={(e) =>
              handleItemChange(index, "quantity", Number(e.target.value))
            }
          />

          <Form.Control
            type="number"
            placeholder="Price"
            value={item.price}
            onChange={(e) =>
              handleItemChange(index, "price", Number(e.target.value))
            }
          />

          <Button variant="danger" onClick={() => removeItem(index)}>
            X
          </Button>
        </div>
      ))}

      {/* Add Item Button */}
      <Button variant="secondary" onClick={addItem} className="mb-3">
        + Add Item
      </Button>

      {/* Total */}
      <div className="mb-3">
        <b>
          Total: ₹
          {items.reduce((sum, item) => sum + item.quantity * item.price, 0)}
        </b>
      </div>

      {/* Submit */}
      <div className="text-end">
        <Button type="submit">Save</Button>
      </div>
    </Form>
  );
}

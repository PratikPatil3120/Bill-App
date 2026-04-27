import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import API from "../services/api";
import { toast } from "react-toastify";

export default function InvoiceForm({
  onSuccess,
  formattedDate,
  setFetch,
  invoiceId,
  getDataById,
  setDataById,
}) {
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [customerNo, setCustomerNo] = useState("");
  const [addvancePayment, setAddvancePayment] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [existingAttachment, setExistingAttachment] = useState(null);

  const [items, setItems] = useState([
    { name: "", quantity: 1, price: 0, date: new Date() },
  ]);

  // Handle item change
  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  useEffect(() => {
    if (!invoiceId) return;

    API.get(`/invoices/${invoiceId}`)
      .then((res) => setDataById(res.data.data))
      .catch((err) => console.error(err));
  }, [invoiceId]);

  useEffect(() => {
    if (getDataById) {
      setCustomerName(getDataById.customerName || "");
      setAddress(getDataById.address || "");
      setCustomerNo(getDataById.custmer_no || "");
      setAddvancePayment(getDataById.advance || 0);
      setItems(getDataById.items || []);
      setExistingAttachment(getDataById.attachment || null);
    }
  }, [getDataById]);

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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formattedItems = items.map(({ _id, ...item }) => ({
        ...item,
        date:
          item.date && !isNaN(new Date(item.date)) ? new Date(item.date) : null,
      }));
      const totalAmount = items.reduce(
        (sum, item) => sum + Number(item.price || 0),
        0,
      );

      const formData = new FormData();

      formData.append("customerName", customerName);
      formData.append("custmer_no", customerNo);
      formData.append("advance", addvancePayment);
      formData.append("address", address);
      formData.append("items", JSON.stringify(formattedItems));
      formData.append("totalAmount", totalAmount);

      if (file) {
        formData.append("attachment", file);
      }

      // MAIN FIX HERE
      if (invoiceId) {
        await API.put(`/invoices/${invoiceId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("✅ Invoice updated successfully!");
      } else {
        await API.post("/invoices", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("✅ Invoice created successfully!");
      }

      onSuccess();
      setFetch(true);
    } catch (error) {
      console.error(error);
      toast.error(
        invoiceId
          ? "❌ Failed to update invoice"
          : "❌ Failed to create invoice",
      );
    }
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
        <Col>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
      <Row>
        <Col>
          <Form.Group className="mt-2">
            <Form.Label>Attachment</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
        </Col>
        {existingAttachment && !preview && (
          <div
            style={{
              marginTop: "10px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              width: "250px",
              background: "#f9f9f9",
            }}
          >
            <p style={{ margin: 0, fontSize: "12px" }}>Existing Attachment:</p>

            {existingAttachment.endsWith(".png") ||
            existingAttachment.endsWith(".jpg") ||
            existingAttachment.endsWith(".jpeg") ? (
              <img
                src={`http://localhost:5000/uploads/${existingAttachment}`}
                alt="attachment"
                style={{
                  width: "100%",
                  marginTop: "5px",
                  borderRadius: "6px",
                }}
              />
            ) : (
              <a
                href={`http://localhost:5000/uploads/${existingAttachment}`}
                target="_blank"
                rel="noreferrer"
              >
                📄 View File
              </a>
            )}
          </div>
        )}
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
      {/* <div className="mb-3">
        <b>
          Total: ₹
          {items.reduce((sum, item) => sum + item.quantity * item.price, 0)}
        </b>
      </div> */}

      {/* Submit */}
      <div className="text-end">
        {invoiceId ? (
          <Button type="submit" size="md">
            Update
          </Button>
        ) : (
          <Button type="submit" size="md">
            Save
          </Button>
        )}
      </div>
    </Form>
  );
}

import React from "react";

export default function InvoicePrint({ data }) {
  if (!data) return null;

  return (
    <div
      style={{ padding: "10px", fontFamily: "Arial", border: "1px solid #000" }}
    >
      {/* Title */}
      <h3 style={{ textAlign: "center", marginBottom: "10px" }}>Tax Invoice</h3>

      {/* Header Section */}
      <div style={{ display: "flex", border: "1px solid #000" }}>
        {/* Left Logo */}
        <div
          style={{ flex: 1, padding: "10px", borderRight: "1px solid #000" }}
        >
          <h2 style={{ color: "#e91e63" }}>Balaji Graphics</h2>
          <p>Printing & Design</p>
        </div>

        {/* Right Company Details */}
        <div style={{ flex: 1, padding: "10px" }}>
          <b>Balaji Graphics</b>
          <br />
          Sangli, Tasgaon Road
          <br />
          Maharashtra, India
          <br />
          Phone: 9876543210
          <br />
          Email: balaji@gmail.com
          <br />
          GSTIN: XXXXXXXX
        </div>
      </div>

      {/* Customer + Invoice Info */}
      <div
        style={{ display: "flex", border: "1px solid #000", borderTop: "none" }}
      >
        {/* Customer */}
        <div
          style={{ flex: 1, padding: "10px", borderRight: "1px solid #000" }}
        >
          <b>To</b>
          <br />
          {data.customerName}
          <br />
        </div>

        {/* Invoice Details */}
        <div style={{ flex: 1, padding: "10px" }}>
          <div>
            <b>Invoice No:</b> {data._id}
          </div>
          <div>
            <b>Date:</b> {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Items Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "10px",
        }}
        border="1"
      >
        <thead style={{ background: "#1976d2", color: "#fff" }}>
          <tr>
            <th>SNo</th>
            <th>Item Description</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Tax</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>{data.customerName}</td>
            <td>1</td>
            <td>{data.totalAmount}</td>
            <td>GST 18%</td>
          </tr>
        </tbody>
      </table>

      {/* Summary */}
      <div style={{ marginTop: "10px", textAlign: "right" }}>
        <b>Total: ₹{data.totalAmount}</b>
      </div>

      {/* Footer */}
      <div style={{ display: "flex", marginTop: "40px" }}>
        <div style={{ flex: 1 }}>Customer Signature</div>
        <div style={{ flex: 1, textAlign: "right" }}>Authorized Signature</div>
      </div>
    </div>
  );
}

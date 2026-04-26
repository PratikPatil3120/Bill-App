import React from "react";

export default function InvoicePrint({ data }) {
  if (!data) return null;

  const thStyle = {
    border: "1px solid #000",
    padding: "6px",
    textAlign: "center",
    fontWeight: "bold",
  };

  const tdStyle = {
    border: "1px solid #000",
    padding: "6px",
    textAlign: "center",
  };

  // const lineStyle = {
  //   margin: "6px 0",
  //   borderBottom: "1px dashed #000",
  // };

  return (
    <div style={{ width: "800px", margin: "auto", fontFamily: "Arial" }}>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h3 style={{ margin: 0 }}>BALAJI GRAPHICS</h3>
          <p style={{ margin: "2px 0", fontSize: "12px" }}>
            Sangli-Tasgaon Main Road, Near Kokate Paints &<br />
            Korade Furniture, Budhgaon.
          </p>
          <p style={{ margin: "2px 0", fontSize: "12px" }}>
            Prop. Himani Patil - 7744089034
          </p>
        </div>

        <div>
          <img src="/graphicsLogo.jpg" alt="logo" style={{ width: "80px" }} />
        </div>
      </div>

      <hr style={{ border: "1px solid #000" }} />

      {/* BILL TITLE */}
      <h2 style={{ textAlign: "center", color: "#1e88e5" }}>BILL</h2>

      {/* BILL TO */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <b>Bill To</b>
          <p style={{ margin: "5px 0" }}>{data.customerName}</p>
        </div>

        <div style={{ textAlign: "right" }}>
          <b>Invoice Details</b>
          <p style={{ margin: "5px 0" }}>Invoice No: {data._id}</p>
          <p style={{ margin: "5px 0" }}>
            Date: {new Date(data.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* TABLE */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "15px",
          fontSize: "13px",
          border: "1px solid #000",
        }}
      >
        <thead style={{ background: "#1e88e5", color: "#fff" }}>
          <tr>
            <th style={thStyle}>Sr.No</th>
            <th style={thStyle}>Item name</th>
            <th style={thStyle}>Quantity</th>
            <th style={thStyle}>Price/Unit</th>
            <th style={thStyle}>Amount</th>
          </tr>
        </thead>

        <tbody>
          {data.items.map((item, index) => (
            <tr key={item._id || index}>
              <td style={tdStyle}>{index + 1}</td>
              <td style={tdStyle}>{item.name}</td>
              <td style={tdStyle}>{item.quantity}</td>
              <td style={tdStyle}>₹ {item.price}</td>
              <td style={tdStyle}>₹ {item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr style={{ marginTop: "10px", border: "1px solid #000" }} />

      {/* SUMMARY (NEW SIMPLE STYLE) */}
      {/* 🔹 BOTTOM SECTION */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "15px",
          gap: "20px",
        }}
      >
        {/* LEFT SIDE */}
        <div style={{ fontSize: "13px", width: "60%" }}>
          <p>
            <b>Invoice Amount in Words:</b> {data.totalAmount} only
          </p>

          <p>
            <b>Payment Mode:</b> Cash / Online
          </p>

          <p>
            <b>Terms and Conditions</b>
            <br />
            • काम दिल्यावर वेळेत पूर्ण केले जाईल <br />
            • साहित्याच्या वेळेत उशीर झाल्यास जबाबदारी नाही <br />• तांत्रिक
            कारणास्तव फरक पडल्यास सहकार्य करावे
          </p>

          <p>
            <b>Bank Details</b>
            <br />
            Bank Name: Bank of Maharashtra <br />
            Name: Himani Amit Patil <br />
            Account No: 60175145393 <br />
            IFSC: MAHB0001856
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div
          style={{
            fontSize: "13px",
            width: "35%",
            marginLeft: "auto",
          }}
        >
          <div>Sub Total: ₹ {data.totalAmount}</div>
          <div style={{ borderBottom: "1px solid #000", margin: "6px 0" }} />

          <div>
            <b>Total: ₹ {data.totalAmount}</b>
          </div>
          <div style={{ borderBottom: "1px solid #000", margin: "6px 0" }} />

          <div>Received: ₹ {data.totalAmount}</div>
          <div style={{ borderBottom: "1px solid #000", margin: "6px 0" }} />

          <div>Previous Balance: ₹ 0</div>
        </div>
      </div>
    </div>
  );
}

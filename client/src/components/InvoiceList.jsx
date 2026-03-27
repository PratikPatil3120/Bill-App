import { useEffect, useState } from "react";
import API from "../services/api";

export default function InvoiceList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/invoices").then((res) => setData(res.data));
  }, []);

  return (
    <div>
      <h2>Invoices</h2>
      {data.map((inv) => (
        <div key={inv._id}>
          {inv.customerName} - ₹{inv.totalAmount}
        </div>
      ))}
    </div>
  );
}

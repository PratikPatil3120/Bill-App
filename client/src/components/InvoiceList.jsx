import { useEffect, useState } from "react";
import API from "../services/api";
import { Table } from "react-bootstrap";
// import Table from "react-bootstrap";

export default function InvoiceList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/invoices").then((res) => setData(res.data));
  }, []);

  return (
    // <div>
    //   <h2>Invoices</h2>
    //   {data.map((inv) => (
    //     <div key={inv._id}>
    //       {inv.customerName} - ₹{inv.totalAmount}
    //     </div>
    //   ))}
    // </div>
    <Table striped bordered hover className="mt-2">
      <thead>
        <tr>
          <th>Customer Name</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Total Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {data.map((inv) => (
          <tr key={inv._id}>
            <td>{inv.customerName}</td>
            <td>{inv.items[0].quantity}</td>
            <td>{inv.items[0].price}</td>
            <td>₹{inv.totalAmount}</td>
            <td>{new Date(inv.createdAt).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

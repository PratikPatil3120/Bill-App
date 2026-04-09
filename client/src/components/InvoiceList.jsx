// components/InvoiceList.js
import React, { useEffect, useRef, useState } from "react";
import { Table, Container, Button, Form } from "react-bootstrap";
import styled from "styled-components";
import API from "../services/api";
import InvoicePrint from "./InvoicePrint";

const Card = styled.div`
  background: #fff;
  padding: 20px;
  margin-top: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;

export default function InvoiceList() {
  const [data, setData] = useState([]);
  const [searchName, setSearchName] = useState([]);

  const filterName = data?.filter((item) =>
    item?.customerName
      ?.toLowerCase()
      .includes((searchName || "").toString().toLowerCase()),
  );
  console.log("filterName", filterName);

  const [selected, setSelected] = useState(null);

  const printRef = useRef();

  useEffect(() => {
    API.get("/invoices").then((res) => setData(res.data));
  }, []);

  const handlePrint = (inv) => {
    setSelected(null);

    setTimeout(() => {
      setSelected(inv);
    }, 0);
  };

  useEffect(() => {
    if (selected && printRef.current) {
      const printContents = printRef.current.innerHTML;

      const win = window.open("", "", "width=800,height=600");

      win.document.write(`
      <html>
        <head>
          <title>Print</title>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);

      win.document.close();
      win.print();
    }
  }, [selected]);

  return (
    <Container>
      <Card>
        <div className="d-flex justify-content-between">
          <h4>Invoice List</h4>
          <div>
            <Form.Control
              type="search"
              placeholder="Search Custemr Name"
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>
        </div>

        <Table striped bordered hover className="mt-2">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filterName.map((inv, index) => (
              <tr key={inv._id}>
                <td>{index + 1}</td>
                <td>{inv.customerName}</td>
                <td>₹{inv.totalAmount}</td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handlePrint(inv)}
                  >
                    Print
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* ✅ THIS WAS MISSING */}
      <div style={{ display: "none" }}>
        {selected && (
          <div ref={printRef}>
            <InvoicePrint data={selected} />
          </div>
        )}
      </div>
    </Container>
  );
}

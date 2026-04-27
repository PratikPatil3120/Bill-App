// components/InvoiceList.js
import React, { useEffect, useRef, useState } from "react";
import { Table, Container, Button, Form } from "react-bootstrap";
import styled from "styled-components";
import API from "../services/api";
import InvoicePrint from "./InvoicePrint";
import Pagination from "./common/Pagination";
import Modals from "./common/Modal";
import { convertToDateFormat } from "../uttils/Dateutillis";
import "../App.css"; // or correct path
import { MdDelete, MdLocalPrintshop } from "react-icons/md";

const Card = styled.div`
  background: #f9f9f9;
  padding: 20px;
  margin-top: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;

export default function InvoiceList({
  fetch,
  setFetch,
  setShow,
  setinvoiceId,
}) {
  const [data, setData] = useState([]);
  const [searchName, setSearchName] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  // const deleteHandler = () => {
  //   setIsOpen(true);
  // };

  console.log("fetch", fetch);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const recordsPerPage = 10;

  useEffect(() => {
    API.get("/invoices").then((res) => {
      setData(res.data);
      setFetch(false); // reset trigger
    });
  }, [fetch]); // 👈 important

  const filterName = data?.filter((item) =>
    item?.customerName
      ?.toLowerCase()
      .includes((searchName || "").toString().toLowerCase()),
  );

  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;

  const currentRecords = filterName.slice(indexOfFirst, indexOfLast);
  console.log("currentRecords", currentRecords);

  console.log("filterName,,,,,,,,,,,", filterName);

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

  const handleModalAction = (confirm) => {
    setIsOpen(false);

    if (confirm) {
      handleDelete(selectedId); // ✅ only delete on confirm
    }
  };

  const handleDelete = async (id) => {
    setIsOpen(false);
    try {
      const response = await API.delete(`/invoices/${id}`);

      if (response?.status === 200) {
        console.log("Successfully deleted");

        // ✅ Remove deleted item from UI
        setData((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.log(
        "Error while deleting",
        error?.response?.data || error.message,
      );
    }
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
    <Container fluid>
      <Card>
        <Modals show={isOpen} handleClose={handleModalAction} title={"Alert"} />
        <div className="d-flex justify-content-between">
          <h4>Invoice List</h4>
          <div>
            <Form.Control
              type="search"
              placeholder="Search Custemr Name"
              onChange={(e) => {
                setSearchName(e.target.value);
                setCurrentPage(1); // ✅ reset page
              }}
            />
          </div>
        </div>

        <div
          style={{
            maxHeight: "450px",
            overflowY: "auto",
            overflowX: "auto",
          }}
        >
          <Table striped bordered hover className="mt-2">
            <thead>
              <tr>
                <th>Sr.No</th>
                <th>Customer Name</th>
                <th>Date</th>
                <th>Mobile Number</th>
                <th>Advnace Payment</th>
                <th>Pending Payment</th>
                <th>Total Amount</th>
                <th>Action</th>
                <th>Attachment</th>
              </tr>
            </thead>

            <tbody>
              {currentRecords.map((inv, index) => (
                <tr key={inv._id}>
                  <td>{index + 1}</td>
                  <td>{inv.customerName}</td>
                  <td>
                    {/* {inv.items.map((item, i) => (
                      <div key={i}>{convertToDateFormat(item.date)}</div>
                    ))} */}
                    {convertToDateFormat(inv.items?.[0]?.date)}{" "}
                  </td>
                  <td>{inv.custmer_no}</td>
                  <td>₹{inv.advance ? inv.advance : "0"}</td>
                  <td style={{ color: "red" }}>
                    ₹
                    {inv.advance
                      ? inv.totalAmount - inv.advance
                      : inv.totalAmount}
                  </td>
                  <td>₹{inv.totalAmount}</td>

                  <td className="d-flex justify-content-center align-item-center gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        setShow(true);
                        setinvoiceId(inv._id);
                      }}
                    >
                      View
                    </Button>
                    <MdLocalPrintshop
                      onClick={() => handlePrint(inv)}
                      style={{
                        fontSize: "22px",
                        cursor: "pointer",
                        marginRight: "10px",
                      }}
                    />

                    <MdDelete
                      onClick={() => {
                        setSelectedId(inv._id);
                        setIsOpen(true);
                      }}
                      style={{
                        fontSize: "22px",
                        cursor: "pointer",
                        color: "red", // delete icon red
                      }}
                    />
                  </td>
                  <td>
                    {inv.attachment ? (
                      <a
                        href={`http://localhost:5000/uploads/${inv.attachment}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View File
                      </a>
                    ) : (
                      "No File"
                    )}
                  </td>
                </tr>
              ))}
              {currentRecords?.length === 0 && (
                <tr>
                  <td colSpan="12">
                    <div className="no-data-container">
                      <i className="bi bi-search no-data-icon"></i>
                      <h6>No Records Found</h6>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        <Pagination
          totalRecords={filterName.length}
          recordsPerPage={recordsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
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

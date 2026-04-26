// components/AppNavbar.js
import React, { useState } from "react";
import { Navbar, Nav, Container, Button, Modal } from "react-bootstrap";
import InvoiceForm from "./InvoiceForm";
import InvoiceList from "./InvoiceList";

export default function AppNavbar() {
  const [show, setShow] = useState(false);
  const [fetch, setFetch] = useState(false);

  const today = new Date();
  const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#" className="d-flex align-items-center gap-2">
            <img
              src="/graphicsLogo.jpg"
              alt="logo"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%", // ✅ makes it circular
                objectFit: "cover",
              }}
            />
            <span>Balaji Graphics</span>
          </Navbar.Brand>{" "}
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-between">
            <Nav>{/* <Nav.Link href="#">Invoices</Nav.Link> */}</Nav>

            {/* Right Side Button */}
            <Button variant="success" onClick={() => setShow(true)}>
              + Create Invoice
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal */}
      <Modal show={show} onHide={() => setShow(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create Invoice : {formattedDate}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InvoiceForm
            onSuccess={() => setShow(false)}
            formattedDate={formattedDate}
            setFetch={setFetch}
          />
        </Modal.Body>
      </Modal>

      <InvoiceList fetch={fetch} setFetch={setFetch} />
    </>
  );
}

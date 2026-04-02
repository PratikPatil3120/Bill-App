// components/AppNavbar.js
import React, { useState } from "react";
import { Navbar, Nav, Container, Button, Modal } from "react-bootstrap";
import InvoiceForm from "./InvoiceForm";

export default function AppNavbar() {
  const [show, setShow] = useState(false);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">Invoice App</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-between">
            <Nav>
              <Nav.Link href="#">Invoices</Nav.Link>
            </Nav>

            {/* Right Side Button */}
            <Button variant="success" onClick={() => setShow(true)}>
              + Create Invoice
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InvoiceForm onSuccess={() => setShow(false)} />
        </Modal.Body>
      </Modal>
    </>
  );
}

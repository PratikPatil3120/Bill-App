import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { FaExclamationTriangle } from "react-icons/fa";
import { IconWrapper, Message, StyledModal, Title } from "./CustomModal.styled";
function Modals({ show, handleClose, title }) {
  const config = {
    delete: {
      icon: <FaExclamationTriangle color="#ef4444" size={38} />,
      iconBg: "#fee2e2",
      btnVariant: "danger",
      btnLabel: "Yes, Delete",
    },
  };
  const { icon, iconBg, btnVariant } = config["delete"] || config.info;

  return (
    <StyledModal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      keyboard={false}
      title={title}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <IconWrapper bgColor={iconBg}>{icon}</IconWrapper>
        <Title>{title ? title : "Confirmation"}</Title>
        <Message>{"Are you sure you want to delete?"}</Message>

        <Row>
          <Col className="d-flex gap-2 justify-content-center mt-4">
            <Button
              data-bs-dismiss="modal"
              variant="outline-primary"
              onClick={() => {
                handleClose(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant={btnVariant}
              data-bs-dismiss="modal"
              onClick={() => {
                handleClose(true);
              }}
            >
              {"Yes,Delete"}
            </Button>
          </Col>
        </Row>
      </div>
    </StyledModal>
  );
}

export default Modals;

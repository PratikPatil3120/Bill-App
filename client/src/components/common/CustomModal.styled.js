import { Modal } from "react-bootstrap";
import styled from "styled-components";

export const StyledModal = styled(Modal)`
  display: flex !important;
  align-items: center; /* Vertically centers modal */
  justify-content: center; /* Horizontally centers modal */

  .modal-dialog {
    margin: 0 auto; /* Removes default Bootstrap top margin */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-content {
    border-radius: 20px;
    padding: 1.8rem 1.5rem;
    border: none;
    border-radius: 10px;
    width: 350px;
    text-align: center;
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.25);
    animation: fadeIn 0.25s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const IconWrapper = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  background-color: ${(props) => props.bgColor || "#e5e7eb"};
`;

export const Title = styled.h5`
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.6rem;
`;

export const Message = styled.p`
  color: #6b7280;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
`;

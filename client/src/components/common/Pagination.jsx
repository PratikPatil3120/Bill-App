import React from "react";
import { Button } from "react-bootstrap";

const Pagination = ({
  totalRecords,
  recordsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  if (totalPages <= 1) return null; // hide if not needed

  return (
    <div className="d-flex justify-content-between align-items-center mt-3">
      {/* Prev */}
      <Button
        variant="secondary"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </Button>

      {/* Page Info */}
      <span>
        Page {currentPage} of {totalPages}
      </span>

      {/* Next */}
      <Button
        variant="secondary"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;

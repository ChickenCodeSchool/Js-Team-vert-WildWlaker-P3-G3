import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ReportPaginationProps } from "../../../types/dashboardReport";
import "./ReportPagination.css";

function ReportPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ReportPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="ReportPagination-Global">
      <button
        type="button"
        className="ReportPagination-Button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Page précédente"
      >
        <ChevronLeft size={18} />
      </button>
      <span className="ReportPagination-Page">
        Page {currentPage} / {totalPages}
      </span>
      <button
        type="button"
        className="ReportPagination-Button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Page suivante"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

export default ReportPagination;

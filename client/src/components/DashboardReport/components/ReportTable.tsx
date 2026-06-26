import { ChevronDown, ChevronUp, Eye } from "lucide-react";
import type {
  SortColumn,
  SortDirection,
  UnifiedReport,
} from "../../../types/dashboardReport";
import "./ReportTable.css";

const TICKET_LABELS: Record<UnifiedReport["type"], string> = {
  bug: "Bug",
  user: "Utilisateur",
  event: "Événement",
};

const columnLabels: Record<SortColumn, string> = {
  user: "Utilisateur",
  type: "Ticket",
  date: "Date signalée",
  status: "Statut",
};

type ReportTableProps = {
  reports: UnifiedReport[];
  onView: (report: UnifiedReport) => void;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  onSort: (column: SortColumn) => void;
};

const columns = (Object.keys(columnLabels) as SortColumn[]).map((key) => ({
  key,
  label: columnLabels[key],
}));

function ReportTable({
  reports,
  onView,
  sortColumn,
  sortDirection,
  onSort,
}: ReportTableProps) {
  return (
    <table className="ReportTable-Global">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>
              <button
                type="button"
                className="ReportTable-SortButton"
                onClick={() => onSort(col.key)}
              >
                {col.label}
                {sortColumn === col.key &&
                  (sortDirection === "asc" ? (
                    <ChevronDown size={14} />
                  ) : (
                    <ChevronUp size={14} />
                  ))}
              </button>
            </th>
          ))}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {reports.map((report) => (
          <tr key={`${report.type}-${report.id}`}>
            <td className="ReportTable-UserColumn">
              <div className="ReportTable-User">
                <span>{report.username}</span>
                <span className="ReportTable-Email">{report.email}</span>
              </div>
            </td>
            <td data-label={columnLabels.type}>{TICKET_LABELS[report.type]}</td>
            <td data-label={columnLabels.date}>
              {new Date(report.date).toLocaleDateString("fr-FR")}
            </td>
            <td data-label={columnLabels.status}>
              <span
                className={`ReportTable-Status ${Number(report.is_done) ? "finished" : "ongoing"}`}
              >
                {Number(report.is_done) ? "Terminé" : "En cours"}
              </span>
            </td>
            <td className="ReportTable-Action">
              <button
                type="button"
                className="ReportTable-ButtonEye"
                onClick={() => onView(report)}
                aria-label="Voir le signalement"
              >
                <Eye size={18} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ReportTable;

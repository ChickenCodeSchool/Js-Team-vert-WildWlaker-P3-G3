import { Eye } from "lucide-react";
import type { UnifiedReport } from "../../../types/dashboardReport";
import "./ReportTable.css";

const TICKET_LABELS: Record<UnifiedReport["type"], string> = {
  bug: "Bug",
  user: "Utilisateur",
  event: "Événement",
};

type ReportTableProps = {
  reports: UnifiedReport[];
  onView: (report: UnifiedReport) => void;
};

function ReportTable({ reports, onView }: ReportTableProps) {
  return (
    <table className="ReportTable">
      <thead>
        <tr>
          <th>Utilisateur</th>
          <th>Ticket</th>
          <th>Date signalée</th>
          <th>Statut</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {reports.map((report) => (
          <tr key={`${report.type}-${report.id}`}>
            <td>
              <div className="ReportTable-User">
                <span>{report.username}</span>
                <span className="ReportTable-Email">{report.email}</span>
              </div>
            </td>
            <td>{TICKET_LABELS[report.type]}</td>
            <td>{new Date(report.date).toLocaleDateString("fr-FR")}</td>
            <td>
              <span
                className={`ReportTable-Status ${Number(report.is_done) ? "finished" : "ongoing"}`}
              >
                {Number(report.is_done) ? "Terminé" : "En cours"}
              </span>
            </td>
            <td>
              <button
                type="button"
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

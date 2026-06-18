import { Bug, Calendar, Eye, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type {
  ReportBug,
  ReportEvent,
  ReportUser,
  UnifiedReport,
} from "../../types/dashboardReport";

import Filter from "../AddEvents/Filter";

import "./DashboardReport.css";

type FilterType = "all" | "ongoing" | "finished";

const TICKET_LABELS: Record<UnifiedReport["type"], string> = {
  bug: "Bug",
  user: "Utilisateur",
  event: "Événement",
};

function DashboardReport() {
  const [reportBug, setReportBug] = useState<ReportBug[]>([]);
  const [reportUser, setReportUser] = useState<ReportUser[]>([]);
  const [reportEvent, setReportEvent] = useState<ReportEvent[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>("ongoing");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3310/api/admin/reportUser")
      .then((res) => res.json())
      .then((data) => {
        console.log("keys reportBug:", Object.keys(data[0]));
        console.log("reportBug[0]:", JSON.stringify(data[0]));
        setReportUser(data);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:3310/api/admin/reportBug")
      .then((res) => res.json())
      .then((data) => {
        console.log("keys reportBug:", Object.keys(data[0]));
        console.log("reportBug[0]:", JSON.stringify(data[0]));
        setReportBug(data);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:3310/api/admin/reportEvent")
      .then((res) => res.json())
      .then((data) => {
        console.log("keys reportBug:", Object.keys(data[0]));
        console.log("reportBug[0]:", JSON.stringify(data[0]));
        setReportEvent(data);
      });
  }, []);

  const allReports: UnifiedReport[] = [
    ...reportBug.map((r) => ({
      id: r.reported_bug_id,
      type: "bug" as const,
      username: r.username,
      date: r.reported_bug_date,
      is_done: r.reported_bug_is_done,
    })),
    ...reportUser.map((r) => ({
      id: r.reported_user_id,
      type: "user" as const,
      username: r.username,
      date: r.reported_user_date,
      is_done: r.reported_user_is_done,
    })),
    ...reportEvent.map((r) => ({
      id: r.reported_event_id,
      type: "event" as const,
      username: r.username,
      date: r.reported_event_date,
      is_done: r.reported_event_is_done,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const filteredReports = allReports.filter((report) => {
    if (activeFilter === "ongoing") return Number(report.is_done) === 0;
    if (activeFilter === "finished") return Number(report.is_done) === 1;
    return true;
  });

  console.log("allReports:", allReports);
  console.log("activeFilter:", activeFilter);
  console.log("filteredReports:", filteredReports);
  return (
    <>
      <main className="DashboardReport-global">
        <section className="DashboardReport-Grid">
          <article className="DashboardReport-StatCard">
            <Users />
            <span>Signalements d'utilisateurs</span>
            <h2>{reportUser.length}</h2>
          </article>
          <article className="DashboardReport-StatCard">
            <Calendar />
            <span>Signalements d'événements</span>
            <h2>{reportEvent.length}</h2>
          </article>
          <article className="DashboardReport-StatCard">
            <Bug />
            <span>Signalements de bugs</span>
            <h2>{reportBug.length}</h2>
          </article>
        </section>
        <section className="DashboardReport-TableSection">
          <div className="HomeEvents-FilterAdd">
            <Filter
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </div>
          <table className="DashboardReport-Table">
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
              {filteredReports.map((report) => (
                <tr key={`${report.type}-${report.id}`}>
                  <td>{report.username}</td>
                  <td>{TICKET_LABELS[report.type]}</td>
                  <td>{new Date(report.date).toLocaleDateString("fr-FR")}</td>
                  <td>
                    <span
                      className={`DashboardReport-Status ${report.is_done ? "finished" : "ongoing"}`}
                    >
                      {Number(report.is_done) ? "Terminé" : "En cours"}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/admin/report/${report.type}/${report.id}`)
                      }
                      aria-label="Voir le signalement"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredReports.length === 0 && (
            <p className="DashboardReport-Empty">Aucun signalement trouvé.</p>
          )}
        </section>
      </main>
    </>
  );
}

export default DashboardReport;

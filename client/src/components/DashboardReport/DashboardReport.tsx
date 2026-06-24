import { Bug, Calendar, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type {
  ReportBug,
  ReportEvent,
  ReportUser,
  UnifiedReport,
} from "../../types/dashboardReport";

import Filter from "../AddEvents/Filter";
import ReportPagination from "./components/ReportPagination";
import ReportStatCard from "./components/ReportStatCard";
import ReportTable from "./components/ReportTable";

import "./DashboardReport.css";

type FilterType = "all" | "ongoing" | "finished";

const REPORTS_PER_PAGE = 5;

function DashboardReport() {
  const [reportBug, setReportBug] = useState<ReportBug[]>([]);
  const [reportUser, setReportUser] = useState<ReportUser[]>([]);
  const [reportEvent, setReportEvent] = useState<ReportEvent[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>("ongoing");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3310/api/admin/reportUser")
      .then((res) => res.json())
      .then((data) => setReportUser(data));
  }, []);
  useEffect(() => {
    fetch("http://localhost:3310/api/admin/reportBug")
      .then((res) => res.json())
      .then((data) => setReportBug(data));
  }, []);
  useEffect(() => {
    fetch("http://localhost:3310/api/admin/reportEvent")
      .then((res) => res.json())
      .then((data) => setReportEvent(data));
  }, []);

  const allReports: UnifiedReport[] = [
    ...reportBug.map((r) => ({
      id: r.reported_bug_id,
      type: "bug" as const,
      username: r.username,
      email: r.email,
      date: r.reported_bug_date,
      is_done: r.reported_bug_is_done,
    })),
    ...reportUser.map((r) => ({
      id: r.reported_user_id,
      type: "user" as const,
      username: r.username,
      email: r.email,
      date: r.reported_user_date,
      is_done: r.reported_user_is_done,
    })),
    ...reportEvent.map((r) => ({
      id: r.reported_event_id,
      type: "event" as const,
      username: r.username,
      email: r.email,
      date: r.reported_event_date,
      is_done: r.reported_event_is_done,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const filteredReports = allReports.filter((report) => {
    if (activeFilter === "ongoing") return Number(report.is_done) === 0;
    if (activeFilter === "finished") return Number(report.is_done) === 1;
    return true;
  });

  const totalPages = Math.ceil(filteredReports.length / REPORTS_PER_PAGE) || 1;

  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * REPORTS_PER_PAGE,
    currentPage * REPORTS_PER_PAGE,
  );

  function handleFilterChange(filter: FilterType) {
    setActiveFilter(filter);
    setCurrentPage(1); // retour page 1 au changement de filtre
  }

  function handleView(report: UnifiedReport) {
    navigate(`/admin/report/${report.type}/${report.id}`);
  }

  return (
    <>
      <main className="DashboardReport-global">
        <section className="DashboardReport-Grid">
          <ReportStatCard
            icon={<Users />}
            label="Signalements d'utilisateurs"
            count={reportUser.length}
            iconClassName="Icon-Users"
          />
          <ReportStatCard
            icon={<Calendar />}
            label="Signalements d'événements"
            count={reportEvent.length}
            iconClassName="Icon-Events"
          />
          <ReportStatCard
            icon={<Bug />}
            label="Signalements de bugs"
            count={reportBug.length}
            iconClassName="Icon-Bugs"
          />
        </section>
        <section className="DashboardReport-TableSection">
          <div className="HomeEvents-FilterAdd">
            <Filter
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
            />
          </div>
          {paginatedReports.length > 0 ? (
            <>
              <ReportTable reports={paginatedReports} onView={handleView} />
              <ReportPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <p className="DashboardReport-Empty">Aucun signalement trouvé.</p>
          )}
        </section>
      </main>
    </>
  );
}

export default DashboardReport;

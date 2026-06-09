import { Bug, CalendarX, UserRoundX } from "lucide-react";
import "./ReportType.css";

interface ReportTypeProps {
  reportType: string;
  setReportType: (value: string) => void;
  setIsModalOpen: (value: boolean) => void;
}

function ReportType({
  reportType,
  setReportType,
  setIsModalOpen,
}: ReportTypeProps) {
  return (
    <fieldset className="reportType-global">
      <legend>Nature du signalement</legend>
      <div className="reportType-cards">
        <label className="reportType-card">
          <CalendarX size={24} className="reportType-icon" />
          <input
            type="radio"
            name="reportType"
            value="evenement"
            checked={reportType === "evenement"}
            onChange={(e) => setReportType(e.target.value)}
          />
          Un événement
        </label>
        <label className="reportType-card">
          <UserRoundX size={24} className="reportType-icon" />
          <input
            type="radio"
            name="reportType"
            value="utilisateur"
            checked={reportType === "utilisateur"}
            onChange={(e) => {
              setReportType(e.target.value);
              setIsModalOpen(true);
            }}
          />
          Un utilisateur
        </label>
        <label className="reportType-card">
          <Bug size={24} className="reportType-icon" />
          <input
            type="radio"
            name="reportType"
            value="bug"
            checked={reportType === "bug"}
            onChange={(e) => setReportType(e.target.value)}
          />
          Bug technique
        </label>
      </div>
    </fieldset>
  );
}

export default ReportType;

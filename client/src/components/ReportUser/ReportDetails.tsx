import "./ReportDetails.css";

interface ReportDetailProps {
  reportDetail: string;
  setReportDetail: (value: string) => void;
}

function ReportDetails({ reportDetail, setReportDetail }: ReportDetailProps) {
  return (
    <fieldset className="reportDetails-global">
      <legend>Détails du problème</legend>
      <label className="reportDetails-label">
        <textarea
          className="reportDetails-textarea"
          placeholder="Décrivez la situation avec autant de détails que possible..."
          value={reportDetail}
          onChange={(e) => setReportDetail(e.target.value)}
          maxLength={255}
        />
        <span className="reportDetails-counter">
          {reportDetail.length} / 255
        </span>
      </label>
    </fieldset>
  );
}

export default ReportDetails;

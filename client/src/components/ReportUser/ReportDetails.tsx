import "./ReportDetails.css";

function ReportDetails() {
  return (
    <fieldset className="reportDetails-global">
      <legend>Détails du problème</legend>
      <label className="reportDetails-label">
        <textarea
          className="reportDetails-textarea"
          placeholder="Décrivez la situation avec autant de détails que possible..."
        />
      </label>
    </fieldset>
  );
}

export default ReportDetails;

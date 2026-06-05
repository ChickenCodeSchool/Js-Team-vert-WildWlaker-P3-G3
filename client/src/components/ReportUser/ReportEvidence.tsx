import "./ReportEvidence.css";

function ReportEvidence() {
  return (
    <fieldset className="reportEvidence-global">
      <legend>Preuves & Captures</legend>
      <label className="reportEvidence-dropzone">
        <input type="file" accept=".jpg, .png, .pdf" multiple />
        Glissez vos fichiers ici ou parcourez
      </label>
      <p>JPG, PNG ou PDF (Max. 10Mo par fichier)</p>
    </fieldset>
  );
}

export default ReportEvidence;

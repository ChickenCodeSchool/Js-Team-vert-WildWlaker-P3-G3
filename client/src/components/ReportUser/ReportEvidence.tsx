import { FileUp } from "lucide-react";
import "./ReportEvidence.css";

function ReportEvidence() {
  return (
    <fieldset className="reportEvidence-global">
      <legend>Preuves & Captures</legend>
      <label className="reportEvidence-dropzone">
        <FileUp size={32} className="reportEvidences-icon" />
        <input type="file" accept=".jpg, .png, .pdf" multiple />
        Faites glisser ou partager vos fichiers ici.
      </label>
      <p>JPG, PNG ou PDF (Max. 10Mo par fichier)</p>
    </fieldset>
  );
}

export default ReportEvidence;

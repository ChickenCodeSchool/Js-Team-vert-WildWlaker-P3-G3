import { FileUp } from "lucide-react";
import "./ReportEvidence.css";

function ReportEvidence() {
  return (
    <fieldset className="reportEvidence-global">
      <legend>Preuves & Captures</legend>
      <label className="reportEvidence-dropzone">
        <div className="reportEvidence-logoIcon">
          <FileUp size={32} className="reportEvidences-icon" />
        </div>
        <input type="file" accept=".jpg, .png, .pdf" multiple />
        Faites glisser ou partager vos fichiers ici.
        <p>JPG, PNG ou PDF (Max. 10Mo par fichier)</p>
      </label>
    </fieldset>
  );
}

export default ReportEvidence;

import { FileUp } from "lucide-react";
import "./ReportEvidence.css";

interface ReportEvidenceProps {
  reportEvidence: File[];
  setReportEvidence: (value: File[]) => void;
}

function ReportEvidence({
  reportEvidence: _reportEvidence,
  setReportEvidence,
}: ReportEvidenceProps) {
  return (
    <fieldset className="reportEvidence-global">
      <legend>Preuves & Captures</legend>
      <label className="reportEvidence-dropzone">
        <div className="reportEvidence-logoIcon">
          <FileUp size={32} className="reportEvidences-icon" />
        </div>
        <input
          type="file"
          onChange={(e) => setReportEvidence(Array.from(e.target.files || []))}
          accept=".jpg, .png, .pdf"
          multiple
        />
        Faites glisser ou partager vos fichiers ici.
        <p>JPG, PNG ou PDF (Max. 10Mo par fichier)</p>
      </label>
    </fieldset>
  );
}

export default ReportEvidence;

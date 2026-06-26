import { FileUp, StickyNoteCheck } from "lucide-react";
import { useState } from "react";
import "./ReportEvidence.css";

interface ReportEvidenceProps {
  reportEvidence: File[];
  setReportEvidence: (value: File[]) => void;
}

function ReportEvidence({
  reportEvidence,
  setReportEvidence,
}: ReportEvidenceProps) {
  const [previews, setPreviews] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setReportEvidence([...reportEvidence, ...files]);

    const newPreviews = files.map((file, i) =>
      file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : `PDF-${Date.now()}-${i}`,
    );
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  return (
    <fieldset className="reportEvidence-global">
      <legend>Preuves & Captures</legend>
      <label className="reportEvidence-dropzone">
        <div className="reportEvidence-previews">
          {previews.map((preview) =>
            preview.startsWith("PDF") ? (
              <span key={preview} className="reportEvidence-pdf">
                <StickyNoteCheck size={28} /> PDF sélectionné
              </span>
            ) : (
              <img
                key={preview}
                src={preview}
                alt={preview}
                className="photoEvidence-preview"
              />
            ),
          )}
        </div>
        <div className="reportEvidence-logoIcon">
          <FileUp size={32} className="reportEvidences-icon" />
        </div>
        Faites glisser ou partager vos fichiers ici.
        <p>JPG, PNG ou PDF (Max. 10Mo par fichier)</p>
        <input
          type="file"
          onChange={handleChange}
          accept=".jpg, .png, .pdf"
          multiple
        />
      </label>
    </fieldset>
  );
}

export default ReportEvidence;

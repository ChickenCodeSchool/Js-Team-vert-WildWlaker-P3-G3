import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import ReportDetails from "../../components/ReportUser/ReportDetails";
import ReportEvidence from "../../components/ReportUser/ReportEvidence";
import ReportType from "../../components/ReportUser/ReportType";
import "./UserReport.css";
import { useState } from "react";

function UserReport() {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const [repType, setRepType] = useState<string>("");
  const [repDetail, setRepDetail] = useState<string>("");
  const [repEvidence, setRepEvidence] = useState<File[]>([]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCancel = () => {
    navigate(`/events/${eventId}`);
    //chemin à confirmer il est tard je suis pas sur de moi c'est event ou dashbord faire vérif avec futur composant dans router. mashallah.
  };

  return (
    <>
      <nav className="userReport-Nav">composant/nav</nav>
      <main className="userReport-Main">
        <header className="userReport-Header">
          <button
            type="button"
            className="userReport-Back"
            onClick={handleGoBack}
            aria-label="Retour à la page précédente"
          >
            <ArrowLeft size={64} />
          </button>
          <div className="userReport-HeaderText">
            <h1>Signaler un problème</h1>
            <p>
              Votre confort est notre priorité. <br /> Aidez-nous à maintenir
              l'excellence de Wedoo en nous faisant part de vos observations.
            </p>
          </div>
        </header>
        <form className="userReport-Form">
          <ReportType reportType={repType} setReportType={setRepType} />
          <ReportDetails
            reportDetail={repDetail}
            setReportDetail={setRepDetail}
          />
          <ReportEvidence
            reportEvidence={repEvidence}
            setReportEvidence={setRepEvidence}
          />
          <div className="userReport-Btn">
            <button type="submit">Signaler</button>
            <button type="button" onClick={handleCancel}>
              Annuler
            </button>
          </div>
        </form>
        <footer className="userReport-Footer">
          <p>
            En soumettant ce formulaire, vous acceptez nos conditions
            d'utilisation et notre politique de confidentialité.
          </p>
        </footer>
      </main>
    </>
  );
}

export default UserReport;

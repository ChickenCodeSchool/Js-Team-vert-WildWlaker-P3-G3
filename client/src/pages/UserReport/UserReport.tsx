import ReportDetails from "../../components/ReportUser/ReportDetails";
import ReportEvidence from "../../components/ReportUser/ReportEvidence";
import ReportType from "../../components/ReportUser/ReportType";
import "./UserReport.css";

function UserReport() {
  return (
    <>
      <nav className="userReport-Nav">composant : nav</nav>
      <main className="userReport-Main">
        <header className="userReport-Header">
          <h1>Signaler un problème</h1>
          <p>
            Votre confort est notre priorité. <br /> Aidez-nous à maintenir
            l'excellence de Wedoo en nous faisant part de vos observations
          </p>
        </header>
        <form className="userReport-Form">
          <ReportType />
          <ReportDetails />
          <ReportEvidence />
          <div className="userReport-Btn">
            <button type="submit">Signaler</button>
            <button type="button">Annuler</button>
          </div>
        </form>
      </main>
      <footer className="userReport-Footer">
        <p>
          En soumettant ce formulaire, vous acceptez nos conditions
          d'utilisation et ntre politique de confidentialité
        </p>
      </footer>
    </>
  );
}

export default UserReport;

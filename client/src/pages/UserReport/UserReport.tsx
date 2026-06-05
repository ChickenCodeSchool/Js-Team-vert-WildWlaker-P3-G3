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
          <div>composant : NATURE DU SIGNALEMENT</div>
          <div>composant : DETAILS DU PROBLEME</div>
          <div>composant : PREUVES & CAPTURES D'ECRAN</div>
          <div className="userReport-Btn">
            <button type="submit">Signaler</button>
            <button type="button">Annuler</button>
          </div>
        </form>
      </main>
      <footer className="userReport-Footer">
        <p>blablabla</p>
      </footer>
    </>
  );
}

export default UserReport;

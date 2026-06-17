import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Profil from "../../components/Profil/Profil";
import ReportAdminModal, {
  type BanAction,
} from "../../components/ReportAdmin/ReportAdminModal";
import "./AdminReport.css";
import {
  ArrowLeft,
  CalendarSync,
  CircleEllipsis,
  Gavel,
  Trash2,
} from "lucide-react";

function AdminReport() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleBanConfirm = (action: BanAction) => {
    console.log("Bannissement confirmé :", action);
    setIsModalOpen(false);
  };

  return (
    <div className="adminReport-Layout">
      <header className="adminReport-headerNav">
        <NavBar />
        <Profil />
      </header>
      <main>
        <article className="adminReport-Global">
          <div className="adminReport-Leftside">
            <section className="adminReport-Title">
              <div className="adminReport-TitleText">
                <p>
                  <ArrowLeft size={11} /> Retour aux signalements
                </p>
                <h1>Signalement #id du ticket à traiter</h1>
              </div>
              <p>
                <span aria-label="Statut">
                  <CircleEllipsis size={10} /> en cours
                </span>
              </p>
            </section>

            <section aria-labelledby="nature" className="adminReport-Type">
              <h2 id="nature">Nature du signalement</h2>
              <div className="adminReport-WrapType">
                <div className="adminReport-WrapType-Icon">
                  <CalendarSync size={24} />
                </div>
                <div className="adminReport-WrapType-TypeText">
                  <h3>Nom import</h3>
                  <p>
                    ici on importe la narute du signalement, event user ou bug
                  </p>
                </div>
              </div>
            </section>

            <section
              aria-labelledby="description"
              className="adminReport-Details"
            >
              <h2 id="description">Description</h2>
              <div className="adminReport-WrapDetails">
                <p>ici on importe la descritions du report en cours</p>
              </div>
            </section>

            <section aria-labelledby="pieces" className="adminReport-Evidence">
              <h2 id="pieces">Pièces jointes</h2>
              <div className="adminReport-WrapEvidence">
                <ul>
                  <li>
                    <img src="/img.jpg" alt=" preuves evidences" />
                  </li>
                </ul>
              </div>
            </section>
            <section
              aria-labelledby="historique"
              className="adminReport-History"
            >
              <h2 id="historique">Historique</h2>
              <ol>
                <li>
                  <h3> Signalement reçu</h3>
                  <span>date et heure du signalement</span>
                </li>
              </ol>
            </section>
          </div>

          <aside className="adminReport-Rightside">
            <section aria-labelledby="auteur" className="adminReport-User">
              <h2 id="auteur">Auteur du signalement</h2>
              <div className="adminReport-User-PP-Wrap">
                <img src="img.ID du user" alt="profil pict user" />
              </div>
              <p>Pseudo du user</p>
              <p>mail du User</p>
            </section>

            <section aria-labelledby="actions" className="adminReport-Action">
              <h2 id="actions">Actions</h2>
              <button type="button" onClick={() => setIsModalOpen(true)}>
                <Gavel size={16} />
                Bannir
              </button>
              <button type="button">
                <Trash2 size={16} />
                Rejeter
              </button>
            </section>
          </aside>
        </article>
      </main>
      <ReportAdminModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleBanConfirm}
      />
    </div>
  );
}

export default AdminReport;

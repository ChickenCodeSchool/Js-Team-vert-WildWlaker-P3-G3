import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import NavBar from "../../components/NavBar/NavBar";
import Profil from "../../components/Profil/Profil";
import ReportAdminModal, {
  type BanAction,
} from "../../components/ReportAdmin/ReportAdminModal";
import type { ReportData } from "../../types/reportData";
import "./AdminReport.css";
import {
  ArrowLeft,
  CalendarSync,
  CircleEllipsis,
  Gavel,
  Trash2,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

function AdminReport() {
  const { id, type } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState<ReportData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    let endpoint = "";
    if (type === "bug") endpoint = `${API_URL}/api/admin/reportBug/${id}`;
    if (type === "event") endpoint = `${API_URL}/api/admin/reportEvent/${id}`;
    if (type === "user") endpoint = `${API_URL}/api/admin/reportUser/${id}`;
    if (!endpoint) return;

    fetch(endpoint)
      .then((res) => res.json())
      .then((data: ReportData) => setReport(data));
  }, [id, type]);

  const handleBanConfirm = (action: BanAction) => {
    console.log("Bannissement confirmé :", action);
    setIsModalOpen(false);
  };

  const getDescription = () =>
    report?.reported_bug_description ??
    report?.reported_event_description ??
    report?.reported_user_description ??
    "—";

  const getDate = () => {
    const raw =
      report?.reported_bug_date ??
      report?.reported_event_date ??
      report?.reported_user_date;

    if (!raw) return "—";

    return new Date(raw).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getImage = () =>
    report?.reported_bug_image ??
    report?.reported_event_image ??
    report?.reported_user_image ??
    null;

  const getUsername = () =>
    type === "user" ? report?.author_username : report?.user_username;

  const getMail = () =>
    type === "user" ? report?.author_mail : report?.user_mail;

  const getPicture = () =>
    type === "user" ? report?.author_picture : report?.user_profile_picture;

  if (!report) return <p>Chargement...</p>;

  return (
    <div className="adminReport-Layout">
      <header className="adminReport-HeaderNav">
        <NavBar />
        <Profil />
      </header>
      <main>
        <article className="adminReport-Global">
          <div className="adminReport-Leftside">
            <section className="adminReport-Title">
              <div className="adminReport-TitleText">
                <button type="button" onClick={() => navigate(-1)}>
                  <ArrowLeft size={18} /> Retour aux signalements
                </button>
                <h1>Signalement #{id}</h1>
              </div>
              <p>
                <span aria-label="Statut">
                  <CircleEllipsis size={10} />{" "}
                  {(report.reported_bug_is_done ??
                  report.reported_event_is_done ??
                  report.reported_user_is_done)
                    ? "traité"
                    : "en cours"}
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
                  <h3>{type}</h3>
                  <p>{getDescription()}</p>
                </div>
              </div>
            </section>

            <section
              aria-labelledby="description"
              className="adminReport-Details"
            >
              <h2 id="description">Description</h2>
              <div className="adminReport-WrapDetails">
                <p>{getDescription()}</p>
              </div>
            </section>

            <section aria-labelledby="pieces" className="adminReport-Evidence">
              <h2 id="pieces">Pièces jointes</h2>
              <div className="adminReport-WrapEvidence">
                <ul>
                  <li>
                    {getImage() ? (
                      <img
                        src={`${API_URL}/uploads/${getImage()}`}
                        alt="preuve jointe"
                      />
                    ) : (
                      "Aucune pièce jointe"
                    )}
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
                  <h3>Signalement reçu</h3>
                  <span>{getDate()}</span>
                </li>
              </ol>
            </section>
          </div>

          <aside className="adminReport-Rightside">
            <section aria-labelledby="auteur" className="adminReport-User">
              <h2 id="auteur">Auteur du signalement</h2>
              <div className="adminReport-User-PP-Wrap">
                <img
                  src={`${API_URL}/uploads/${getPicture()}`}
                  alt="profil pict user"
                />
              </div>
              <p>{getUsername()}</p>
              <p>{getMail()}</p>
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

import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import ReportDetails from "../../components/ReportUser/ReportDetails";
import ReportEvidence from "../../components/ReportUser/ReportEvidence";
import ReportType from "../../components/ReportUser/ReportType";
import "./UserReport.css";
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Profil from "../../components/Profil/Profil";
import ReportUserModal from "../../components/ReportUser/ReportUserModal";
import type EventUserJoin from "../../types/eventUserJoining";
import Swal from "sweetalert2";
const API_URL = import.meta.env.VITE_API_URL;

function UserReport() {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const [repType, setRepType] = useState<string>("");
  const [repDetail, setRepDetail] = useState<string>("");
  const [repEvidence, setRepEvidence] = useState<File[]>([]);
  const [_euj, setEuj] = useState<EventUserJoin[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [reportedUserId, setReportedUserId] = useState<number>(0);

  useEffect(() => {
    fetch(`${API_URL}/api/events/${eventId}/users`)
      .then((response) => response.json())
      .then((data: EventUserJoin[]) => {
        setEuj(data);
      });
  }, [eventId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,

      customClass: {
        popup: "toast",
      },
    });

    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;

    if (!repType || !repDetail || repEvidence.length === 0) {
      toast.fire({
        icon: "error",
        text: "Veuillez remplir les champs pour envoyer votre demande.",

        customClass: {
          popup: "toast-error-popup",
        },
      });
      return;
    }

    //On utilise un switch ici pcq une ternaire gère que 2 cas (vrai ou faux), un switch en gère plusieurs sans que ça devienne illisible et trop verbeux.

    switch (repType) {
      case "utilisateur": {
        const formData = new FormData();
        formData.append("reported_user_description", repDetail);
        formData.append("reported_user_id_user", reportedUserId.toString());
        formData.append("reported_user_by_id_user", user?.id?.toString() ?? "");
        for (const file of repEvidence) {
          formData.append("reported_user_image", file);
        }
        await fetch(`${API_URL}/api/userreport-user`, {
          method: "POST",
          body: formData,
        });
        break;
      }
      case "evenement": {
        const formData = new FormData();
        formData.append("reported_event_description", repDetail);
        formData.append(
          "reported_event_by_id_user",
          user?.id?.toString() ?? "",
        );
        for (const file of repEvidence) {
          formData.append("reported_event_image", file);
        }
        await fetch(`${API_URL}/api/userreport-event`, {
          method: "POST",
          body: formData,
        });
        break;
      }
      case "bug": {
        const formData = new FormData();
        formData.append("reported_bug_description", repDetail);
        formData.append("reported_bug_by_id_user", user?.id?.toString() ?? "");
        for (const file of repEvidence) {
          formData.append("reported_bug_image", file);
        }
        await fetch(`${API_URL}/api/userreport-bug`, {
          method: "POST",
          body: formData,
        });
        break;
      }
    }
    toast.fire({
      icon: "error",
      text: "Votre signalement a bien été pris en compte, merci pour votre retour! !\nL'équipe Wedoo.",

      customClass: {
        popup: "toast-error-popup",
      },
    });
    navigate(`/events/${eventId}`);
  };

  const handleCancel = () => {
    navigate(`/events/${eventId}`);
    //chemin à confirmer avec l'équipe il est tard je suis pas sur de moi c'est event ou dashbord faire vérif avec futur composant dans router. mashallah.
  };

  return (
    <>
      <header className="userReport-HeaderNav">
        <NavBar />
        <Profil />
      </header>
      <main className="userReport-Main">
        <div className="userReport-Header">
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
        </div>
        <form className="userReport-Form" onSubmit={handleSubmit}>
          <ReportType
            reportType={repType}
            setReportType={setRepType}
            setIsModalOpen={setIsModalOpen}
          />
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
      {isModalOpen && (
        <ReportUserModal
          euj={_euj}
          setIsModalOpen={setIsModalOpen}
          setReportedUserId={setReportedUserId}
        />
      )}
    </>
  );
}

export default UserReport;

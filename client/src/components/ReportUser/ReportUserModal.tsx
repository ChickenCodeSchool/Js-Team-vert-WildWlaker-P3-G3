import { CircleX } from "lucide-react";
import type { EventUserJoin } from "../../types/eventUserJoining";
import "./ReportUserModal.css";
import { useEffect, useRef, useState } from "react";

interface ReportUserModalProps {
  euj: EventUserJoin[];
  setIsModalOpen: (value: boolean) => void;
  setReportedUserId: (value: number) => void;
}

function ReportUserModal({
  euj,
  setIsModalOpen,
  setReportedUserId,
}: ReportUserModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  // const userJson = localStorage.getItem("user");
  // const currentUser = userJson ? JSON.parse(userJson) : null;
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/auth/authVerif`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setCurrentUserId(data.id))
      .catch(() => setCurrentUserId(null));
  }, []);

  const otherUsers = euj.filter(
    (activeUser) => activeUser.euj_id_user !== currentUserId,
  );

  return (
    <dialog className="reportUserModal" ref={dialogRef}>
      <header className="reportUserModal-header">
        <h2>Sélectionner un utilisateur</h2>
        <button
          type="button"
          className="reportUserModal-close"
          onClick={() => setIsModalOpen(false)}
          aria-label="Close modal"
        >
          <CircleX size={20} />
        </button>
      </header>
      <ul className="reportUserModal-list">
        {otherUsers.map((activeUser) => (
          <li key={activeUser.euj_id_user} className="reportUserModal-item">
            <div className="reportUserModal-userInfo">
              <img
                className="reportUserModal-avatar"
                src={activeUser.user_profile_picture ?? ""}
                alt={activeUser.user_username}
              />
              <span className="reportUserModal-userName">
                {activeUser.user_username}
              </span>
            </div>
            <button
              type="button"
              className="reportUserModal-btn"
              onClick={() => {
                setReportedUserId(activeUser.euj_id_user);
                setIsModalOpen(false);
              }}
            >
              Signaler
            </button>
          </li>
        ))}
      </ul>
    </dialog>
  );
}

export default ReportUserModal;

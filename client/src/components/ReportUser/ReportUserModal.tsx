import type EventUserJoin from "../../types/eventUserJoining";
import "./ReportUserModal.css";

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
  return (
    <dialog className="reportUserModal" open>
      <header className="reportUserModal-header">
        <h2>Select a user</h2>
        <button
          type="button"
          className="reportUserModal-close"
          onClick={() => setIsModalOpen(false)}
          aria-label="Close modal"
        >
          ✕
        </button>
      </header>
      <ul className="reportUserModal-list">
        {euj.map((activeUser) => (
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
              Report
            </button>
          </li>
        ))}
      </ul>
    </dialog>
  );
}

export default ReportUserModal;

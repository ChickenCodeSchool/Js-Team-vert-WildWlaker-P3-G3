import "./Messagerie.css";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Profil from "../../assets/images/img-card-retraite.png";

type ReceptionMessagesUser = {
  message_id: number;
  message_text: string;
  message_date: string;
  user_name: string;
  user_id: number;
  event_name: string;
};
function Messagerie() {
  const [messagesUser, setMessagesUser] = useState("");
  const [receptionMessagesUser, setReceptionMessagesUser] = useState<
    ReceptionMessagesUser[]
  >([]);
  const [userInEvent, setUserInEvent] = useState<boolean | null>(null);

  const { id } = useParams();
  const event = Number(id);
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userId = user?.id;

  useEffect(() => {
    fetchUserEvent();
    fetchMessages();
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3310/api/messages/${event}`)
      .then((res) => res.json())
      .then((data) => setReceptionMessagesUser(data));
  }, [event]);

  async function fetchUserEvent() {
    const response = await fetch(
      `http://localhost:3310/api/user-in-event/${event}/${userId}`,
    );
    const data = await response.json();
    setUserInEvent(data.joined);
  }
  async function handleSendMessage() {
    try {
      const response = await fetch(
        `http://localhost:3310/api/messages/${event}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            messagesUser: messagesUser,
          }),
        },
      );

      if (response.ok) {
        setMessagesUser("");
        fetchMessages();
      }
    } catch (error) {
      console.error("Messagerie: erreur envoi message", error);
    }
  }

  function fetchMessages() {
    fetch(`http://localhost:3310/api/messages/${event}`)
      .then((res) => res.json())
      .then((data) => setReceptionMessagesUser(data));
  }

  if (userInEvent === null) {
    return <p>Chargement...</p>;
  }
  if (userInEvent === false) {
    return <p>Vous n'êtes pas inscrit à cet événement.</p>;
  }
  return (
    <div className="messagerie">
      <h1>{receptionMessagesUser[0]?.event_name}</h1>
      <div className="messagerie-box">
        <div className="messagerie-box-messages">
          {receptionMessagesUser.map((reception) => (
            <div
              key={reception.message_id}
              className={
                reception.user_id === userId
                  ? "messagerie-box-messages-user"
                  : "messagerie-box-messages-friends"
              }
            >
              {reception.user_id !== userId && (
                <img src={Profil} alt="profil_ami" />
              )}
              <div>{reception.message_text}</div>
            </div>
          ))}
        </div>
        <div className="massagerie-input">
          <input
            type="text"
            value={messagesUser}
            onChange={(e) => setMessagesUser(e.target.value)}
            placeholder="Écrire un message..."
          />
          <button type="button" onClick={handleSendMessage}>
            <Send size={20} className="send" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Messagerie;

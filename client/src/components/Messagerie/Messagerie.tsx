import "./Messagerie.css";
import { ContactRound, Send } from "lucide-react";
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
type UserByEvent = {
  user_username: string;
  user_profile_picture: string;
  user_joining_date: string;
};
function Messagerie() {
  const [messagesUser, setMessagesUser] = useState("");
  const [receptionMessagesUser, setReceptionMessagesUser] = useState<
    ReceptionMessagesUser[]
  >([]);
  const [usersByEvent, setUsersByEvent] = useState<UserByEvent[]>([]);

  const { id } = useParams();
  const event = Number(id);
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userId = user?.id;

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3310/api/messages/${event}`)
      .then((res) => res.json())
      .then((data) => setReceptionMessagesUser(data));
  }, [event]);

  useEffect(() => {
    fetch(`http://localhost:3310/api/user/event/${event}`)
      .then((res) => res.json())
      .then((data) => setUsersByEvent(data));
  }, [event]);

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

      console.log("Messagerie: réponse status", response.status);

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
  function formatMonthYear(dateString: string): string {
    const date = new Date(dateString);

    return date.toLocaleDateString("fr-FR", {
      month: "long",
      year: "numeric",
    });
  }
  function formatHour(dateString: string): string {
    return new Date(dateString).toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  console.log(setReceptionMessagesUser);
  return (
    <div className="messagerie">
      <h1>{receptionMessagesUser[0]?.event_name}</h1>
      <section className="global-messagerie">
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
                <section>
                  <p className="message-text">{reception.message_text}</p>
                  <p className="hour-text">
                    {formatHour(reception.message_date)}
                  </p>
                </section>
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
        <section className="messagerie-contact">
          <h3>
            <ContactRound size={20} />
            Contacts présents
          </h3>
          <hr className="hr-h3" />
          {usersByEvent.map((event) => (
            <div key={event.user_username}>
              <img
                src={`http://localhost:3310${event.user_profile_picture}`}
                alt="photo-profil"
              />
              <div>
                <p>{event.user_username}</p>
                <p className="membre-date">
                  Membre depuis {formatMonthYear(event.user_joining_date)}
                </p>
                <hr />
              </div>
            </div>
          ))}
        </section>
      </section>
    </div>
  );
}

export default Messagerie;

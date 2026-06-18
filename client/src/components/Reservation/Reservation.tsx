import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CardEvents from "../AddEvents/CardEvents";
import "./Reservation.css";
import { CalendarPlus } from "lucide-react";
type Reservation = {
  reservation_id: number;
  reservation_id_event: number;
  reservation_id_user: number | null;
  reservation_name: string;
  reservation_date: string;
  reservation_location: string;
  reservation_description: string;
  reservation_picture: string;
};

function Reservation() {
  const { id } = useParams();
  const eventId = Number(id);
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userId = user?.id;

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [reservationName, setReservationName] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [reservationLocation, setReservationLocation] = useState("");
  const [reservationDescription, setReservationDescription] = useState("");
  const [reservationPicture, setReservationPicture] = useState<File | null>(
    null,
  );
  console.log(activeModal);
  const [preview, setPreview] = useState("");
  useEffect(() => {
    fetch(`http://localhost:3310/api/reservations/all/${eventId}`)
      .then((res) => res.json())
      .then((data) => {
        setReservations(data);
      });
    [eventId];
  });
  async function handleAddReservation() {
    const formData = new FormData();

    formData.append("reservation_id_event", String(eventId));
    formData.append("reservation_id_user", String(userId));
    formData.append("reservation_name", reservationName);
    formData.append("reservation_date", reservationDate);
    formData.append("reservation_location", reservationLocation);
    formData.append("reservation_description", reservationDescription);

    if (reservationPicture) {
      formData.append("reservation_picture", reservationPicture);
    }

    const response = await fetch("http://localhost:3310/api/reservations", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    setReservationName("");
    setReservationDate("");
    setReservationLocation("");
    setReservationDescription("");
    setReservationPicture(null);
    setPreview("");

    setIsModalOpen(false);
    alert("Réservation ajoutée");
  }
  function handleReservationPictureChange(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = e.target.files?.[0];

    if (file) {
      setReservationPicture(file);
      setPreview(URL.createObjectURL(file));
    }
  }
  return (
    <>
      <div className="reservation">
        <div className="reservation-title">
          <h1>Mes Réservations</h1>
          <button type="button" onClick={() => setIsModalOpen(true)}>
            <CalendarPlus size={20} />
            <p>Ajouter une réservation</p>
          </button>
          {isModalOpen && (
            <div
              className="modal-overlay"
              onClick={() => {
                setIsModalOpen(false);
                setActiveModal(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setActiveModal(null);
                }
              }}
            >
              <div
                className="modal"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setActiveModal(null);
                  }
                }}
              >
                <h2>Nouvelle réservation</h2>

                <input
                  type="text"
                  placeholder="Nom"
                  value={reservationName}
                  onChange={(e) => setReservationName(e.target.value)}
                />

                <input
                  type="date"
                  value={reservationDate}
                  onChange={(e) => setReservationDate(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Lieu"
                  value={reservationLocation}
                  onChange={(e) => setReservationLocation(e.target.value)}
                />

                <textarea
                  placeholder="Description"
                  value={reservationDescription}
                  onChange={(e) => setReservationDescription(e.target.value)}
                />

                {/* <input
                  type="text"
                  placeholder="URL image"
                  value={reservationPicture}
                  onChange={(e) => setReservationPicture(e.target.value)}
                /> */}
                <label htmlFor="photo-upload" className="custom-upload">
                  Choisir une image
                </label>

                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleReservationPictureChange}
                  className="hidden-input"
                />
                {preview && (
                  <img src={preview} alt="preview" className="photo-preview" />
                )}

                <button type="button" onClick={handleAddReservation}>
                  Enregistrer
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="reservation-card-global">
          {reservations.map((event) => (
            <CardEvents
              key={event.reservation_id}
              event_id={event.reservation_id}
              event_host_id={null}
              image={`http://localhost:3310${event.reservation_picture}`}
              imageAlt={event.reservation_name}
              date={event.reservation_date}
              title={event.reservation_name}
              description={event.reservation_description}
              location={event.reservation_location}
            />
          ))}
        </div>
      </div>
    </>
  );
}
export default Reservation;

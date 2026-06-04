import mysql from "../../../database/client";

class reservationRepository {
  async readReservationDescriptionEvent(eventId: number) {
    const [rows] = await mysql.query(
      `
      SELECT
  e.event_id,
  u.user_name,
  r.reservation_location,
  r.reservation_date,
  r.reservation_id
FROM reservation AS r

JOIN user AS u
  ON u.user_id = r.reservation_id_user

JOIN event AS e
  ON e.event_id = r.reservation_id_event

WHERE e.event_id = ?;
      `,
      [eventId],
    );

    return rows;
  }
}

export default new reservationRepository();

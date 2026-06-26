import mysql from "../../../database/client";

class MessageRepository {
  async sendMessage(eventId: number, userId: number, messageText: string) {
    const [result] = await mysql.query(
      `INSERT INTO message (
      message_id_event,
      message_id_user,
      message_text
      )
      VALUES (?, ?, ?)`,
      [eventId, userId, messageText],
    );

    return result;
  }
  async getMessagesByEventId(eventId: number) {
    const [rows] = await mysql.query(
      `SELECT
  m.message_id,
  m.message_text,
  m.message_date,
  u.user_name,
  u.user_id,
  e.event_name

FROM message AS m

JOIN user AS u
  ON m.message_id_user = u.user_id

JOIN event AS e
  ON m.message_id_event = e.event_id

WHERE m.message_id_event = ?

ORDER BY m.message_date ASC;`,
      [eventId],
    );

    return rows;
  }
  async notificationMessage(eventId: number, userId: number) {
    const [result] = await mysql.query(
      `INSERT INTO message_read (message_id, user_id)
      SELECT
      m.message_id,
      ?
      FROM message m
      LEFT JOIN message_read mr
      ON mr.message_id = m.message_id
      AND mr.user_id = ?
      WHERE
      m.message_event_id = ?
      AND m.message_user_id <> ?
      AND mr.message_id IS NULL;`,
      [eventId, userId],
    );

    return result;
  }
}
export default new MessageRepository();

import mysql from "../../../database/client";

class MessageRepository {
  async sendMessage(eventId: number, userId: number, messageText: string) {
    console.log("messageRepository.sendMessage", {
      eventId,
      userId,
      messageText,
    });

    const [result] = await mysql.query(
      `INSERT INTO message (
  message_id_event,
  message_id_user,
  message_text
)
VALUES (?, ?, ?)`,
      [eventId, userId, messageText],
    );

    console.log("messageRepository.sendMessage result", result);
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
}
export default new MessageRepository();

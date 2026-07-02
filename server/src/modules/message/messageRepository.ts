import type { ResultSetHeader, RowDataPacket } from "mysql2";
import mysql from "../../../database/client";

type UnreadCountRow = RowDataPacket & {
  count: number;
};

class MessageRepository {
  async sendMessage(eventId: number, userId: number, messageText: string) {
    const [result] = await mysql.query<ResultSetHeader>(
      `INSERT INTO message (
      message_id_event,
      message_id_user,
      message_text
    )
    VALUES (?, ?, ?)`,
      [eventId, userId, messageText],
    );

    const [rows] = await mysql.query<RowDataPacket[]>(
      `SELECT
      m.message_id,
      m.message_text,
      m.message_date,
      u.user_name,
      u.user_id,
      e.event_name
    FROM message m
    JOIN user u
      ON u.user_id = m.message_id_user
    JOIN event e
      ON e.event_id = m.message_id_event
    WHERE m.message_id = ?`,
      [result.insertId],
    );

    return rows[0];
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
      `INSERT INTO message_read (message_read_message_id, message_read_user_id)
      SELECT
      m.message_id,
      ?
      FROM message m
      LEFT JOIN message_read mr
      ON mr.message_read_message_id = m.message_id
      AND mr.message_read_user_id = ?
      WHERE
      m.message_id_event = ?
      AND m.message_id_user <> ?
      AND mr.message_read_message_id IS NULL;`,
      [userId, userId, eventId, userId],
    );

    return result;
  }
  async getUnreadMessages(eventId: number, userId: number) {
    const [rows] = await mysql.query<UnreadCountRow[]>(
      `SELECT COUNT(*) AS count
    FROM message m
    LEFT JOIN message_read mr
      ON mr.message_read_message_id = m.message_id
      AND mr.message_read_user_id = ?
    WHERE m.message_id_event = ?
      AND m.message_id_user <> ?
      AND mr.message_read_message_id IS NULL;`,
      [userId, eventId, userId],
    );

    return rows[0].count;
  }
}
export default new MessageRepository();

import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

import type EventData from "../../types/event";

const generateLinkKey = (): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length: 6 }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length)),
  ).join("");
}; //creation de la cle pour rejoindre un event

class EventRepository {
  async create(event: Omit<EventData, "event_id" | "event_link_key">) {
    const linkKey = generateLinkKey();

    const [result] = await databaseClient.query<Result>(
      "INSERT INTO event (event_name, event_date, event_host_id, event_picture, event_description, event_location, event_link_key) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        event.event_name,
        event.event_date,
        event.event_host_id,
        event.event_picture,
        event.event_description,
        event.event_location,
        linkKey,
      ],
    );
    return result.insertId;
  }
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM event WHERE event_id = ?",
      [id],
    );

    return rows[0] as EventData;
  }

  async readAll(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT DISTINCT e.* FROM event e
      LEFT JOIN event_user_joining euj ON euj.euj_id_event = e.event_id
      WHERE e.event_host_id = ?
      OR euj.euj_id_user = ?
      ORDER BY e.event_date ASC`,
      [userId, userId],
    );

    return rows as EventData[];
  }
  async readByLinkKey(linkKey: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM event WHERE event_link_key = ?",
      [linkKey],
    );
    return rows[0] as EventData | undefined;
  }

  async joinEvent(eventId: number, userId: number) {
    await databaseClient.query<Result>(
      "INSERT INTO event_user_joining (euj_id_event, euj_id_user) VALUES (?, ?)",
      [eventId, userId],
    );
  }
}

export default new EventRepository();

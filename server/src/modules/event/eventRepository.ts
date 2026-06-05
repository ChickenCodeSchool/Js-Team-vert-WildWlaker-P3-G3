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
  async create(event: Omit<EventData, "event_id">) {
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

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM event ORDER BY event_date ASC",
    );

    return rows as EventData[];
  }
}

export default new EventRepository();

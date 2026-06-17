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
      "INSERT INTO event (event_name, event_date_start, event_date_end, event_host_id, event_picture, event_description, event_location, event_link_key) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        event.event_name,
        event.event_date_start,
        event.event_date_end,
        event.event_host_id,
        event.event_picture,
        event.event_description,
        event.event_location,
        linkKey,
      ],
    );
    const eventId = result.insertId;

    await this.joinEvent(eventId, event.event_host_id);

    return eventId;
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
      ORDER BY e.event_date_start ASC`,
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
  async update(
    eventId: number,
    event: {
      event_name: string;
      event_date_start: string;
      event_date_end: string;
      event_description: string;
      event_location: string;
      event_picture?: string;
    },
  ) {
    await databaseClient.query<Result>(
      "UPDATE event SET event_name = COALESCE(?, event_name), event_date_start = COALESCE(?, event_date_start), event_date_end = COALESCE(?, event_date_end), event_description = COALESCE(?, event_description), event_location = COALESCE(?, event_location), event_picture = COALESCE (?, event_picture) WHERE event_id = ?",
      [
        event.event_name ?? null,
        event.event_date_start ?? null,
        event.event_date_end ?? null,
        event.event_description ?? null,
        event.event_location ?? null,
        event.event_picture ?? null,
        eventId,
      ],
    );
  }
}

export default new EventRepository();

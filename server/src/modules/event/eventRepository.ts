import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

import type EventData from "../../types/event";

class EventRepository {
  async create(event: Omit<EventData, "event_id">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO event (event_name, event_date, event_host_id, event_picture, event_description, event_location, event_link_key) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        event.event_name,
        event.event_date,
        event.event_host_id,
        event.event_picture,
        event.event_description,
        event.event_location,
        event.event_link_id,
      ],
    );
    return result.insertId;
  }
}
export default new EventRepository();

import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type RepEvent from "../../types/reportedEvent";

class reportEventRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM reported_event",
    );

    return rows as RepEvent[];
  }

  async create(
    reported_event: Omit<
      RepEvent,
      "reported_event_id" | "reported_event_date" | "reported_event_is_done"
    >,
  ) {
    const [result] = await databaseClient.query<Result>(
      "insert into reported_event (reported_event_id_event,reported_event_description,reported_event_image,reported_event_by_id_user) values (?, ?, ?, ?)",
      [
        reported_event.reported_event_id_event,
        reported_event.reported_event_description,
        reported_event.reported_event_image,
        reported_event.reported_event_by_id_user,
      ],
    );
    return result.insertId;
  }
  async exists(
    reported_event_by_id_user: number,
    reported_event_id_event: number,
  ) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM reported_event WHERE reported_event_by_id_user = ? AND reported_event_id_event = ? AND reported_event_date > NOW() - INTERVAL 72 HOUR",
      [reported_event_by_id_user, reported_event_id_event],
    );
    return rows.length > 0;
  }
}
export default new reportEventRepository();

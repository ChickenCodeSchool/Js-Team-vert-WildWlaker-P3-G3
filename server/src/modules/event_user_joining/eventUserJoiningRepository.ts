import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

type EventUserJoin = {
  euj_id_event: number;
  euj_id_user: number;
};
export type { EventUserJoin };

class eventUserJoiningRepository {
  async readAll(euj_id_event: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM event_user_joining WHERE euj_id_event = ?",
      [euj_id_event],
    );

    return rows as EventUserJoin[];
  }
}
export default new eventUserJoiningRepository();

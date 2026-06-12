import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";
import type EventUserJoin from "../../types/eventUserJoining";

class eventUserJoiningRepository {
  async readAll(euj_id_event: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT euj_id_user, euj_id_event, user_username, user_profile_picture FROM event_user_joining JOIN user ON event_user_joining.euj_id_user= user.user_id WHERE euj_id_event = ?",
      [euj_id_event],
    );

    return rows as EventUserJoin[];
  }
}
export default new eventUserJoiningRepository();

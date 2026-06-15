import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type RepUser from "../../types/reportedUser";

class reportUserRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM reported_user",
    );

    return rows as RepUser[];
  }

  async create(
    reported_user: Omit<
      RepUser,
      "reported_user_id" | "reported_user_date" | "reported_user_is_done"
    >,
  ) {
    const [result] = await databaseClient.query<Result>(
      "insert into reported_user (reported_user_id_user,reported_user_description,reported_user_image,reported_user_by_id_user) values (?, ?, ?, ?)",
      [
        reported_user.reported_user_id_user,
        reported_user.reported_user_description,
        reported_user.reported_user_image,
        reported_user.reported_user_by_id_user,
      ],
    );
    return result.insertId;
  }

  async exists(
    reported_user_by_id_user: number,
    reported_user_id_user: number,
  ) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM reported_user WHERE reported_user_by_id_user = ? AND reported_user_id_user = ? AND reported_user_date > NOW() - INTERVAL 72 HOUR",
      [reported_user_by_id_user, reported_user_id_user],
    );
    return rows.length > 0;
  }
}
export default new reportUserRepository();

import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type RepBug from "../../types/reportedBug";

class reportBugRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM reported_bug",
    );

    return rows as RepBug[];
  }

  async create(
    reported_bug: Omit<
      RepBug,
      "reported_bug_id" | "reported_bug_date" | "reported_bug_is_done"
    >,
  ) {
    const [result] = await databaseClient.query<Result>(
      "insert into reported_bug (reported_bug_description,reported_bug_image,reported_bug_by_id_user) values (?, ?, ?)",
      [
        reported_bug.reported_bug_description,
        reported_bug.reported_bug_image,
        reported_bug.reported_bug_by_id_user,
      ],
    );
    return result.insertId;
  }
}
export default new reportBugRepository();

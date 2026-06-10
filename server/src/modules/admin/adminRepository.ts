import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class AdminRepository {
  async readAllUser() {
    const [rows] = await databaseClient.query(`SELECT user_id FROM user
`);
    return rows;
  }
  async readAllEvent() {
    const [rows] = await databaseClient.query(`SELECT event_id FROM event
`);
    return rows;
  }
  async readArrayReport() {
    const [rows] = await databaseClient.query(`SELECT
    u.user_name,
    'user' AS report_type,
    ru.reported_user_description AS description,
    ru.reported_user_date AS report_date
FROM reported_user AS ru
JOIN user AS u
    ON u.user_id = ru.reported_user_by_id_user

UNION ALL

SELECT
    u.user_name,
    'event' AS report_type,
    re.reported_event_description AS description,
    re.reported_event_date AS report_date
FROM reported_event AS re
JOIN user AS u
    ON u.user_id = re.reported_event_by_id_user

UNION ALL

SELECT
    u.user_name,
    'bug' AS report_type,
    rb.reported_bug_description AS description,
    rb.reported_bug_date AS report_date
FROM reported_bug AS rb
JOIN user AS u
    ON u.user_id = rb.reported_bug_by_id_user

ORDER BY report_date DESC;
`);
    return rows;
  }
  async readArrayUser() {
    const [rows] =
      await databaseClient.query(`SELECT user_name, user_id, user_profile_picture, user_username, user_joining_date
FROM user
`);
    return rows;
  }
  async readDashboardChart() {
    const [rows] = await databaseClient.query<Rows>(`
      SELECT
        month_number,
        month,
        SUM(users) AS users,
        SUM(events) AS events,
        SUM(reports) AS reports
      FROM (
        SELECT
          MONTH(user_joining_date) AS month_number,
          DATE_FORMAT(user_joining_date, '%b') AS month,
          COUNT(user_id) AS users,
          0 AS events,
          0 AS reports
        FROM user
        GROUP BY MONTH(user_joining_date), DATE_FORMAT(user_joining_date, '%b')

        UNION ALL

        SELECT
          MONTH(event_date) AS month_number,
          DATE_FORMAT(event_date, '%b') AS month,
          0 AS users,
          COUNT(event_id) AS events,
          0 AS reports
        FROM event
        GROUP BY MONTH(event_date), DATE_FORMAT(event_date, '%b')

        UNION ALL

        SELECT
          MONTH(report_date) AS month_number,
          DATE_FORMAT(report_date, '%b') AS month,
          0 AS users,
          0 AS events,
          COUNT(*) AS reports
        FROM (
          SELECT reported_user_date AS report_date FROM reported_user
          UNION ALL
          SELECT reported_event_date AS report_date FROM reported_event
          UNION ALL
          SELECT reported_bug_date AS report_date FROM reported_bug
        ) AS all_reports
        GROUP BY MONTH(report_date), DATE_FORMAT(report_date, '%b')
      ) AS dashboard_data
      GROUP BY month_number, month
      ORDER BY month_number;
    `);

    return rows;
  }
  async readReportUser() {
    const [rows] =
      await databaseClient.query(`SELECT  reported_user_id FROM reported_user;
`);
    return rows;
  }
  async readReportBug() {
    const [rows] =
      await databaseClient.query(`SELECT reported_bug_id  FROM reported_bug;
`);
    return rows;
  }
  async readReportEvent() {
    const [rows] =
      await databaseClient.query(`SELECT  reported_event_id FROM reported_event;
`);
    return rows;
  }
}

export default new AdminRepository();

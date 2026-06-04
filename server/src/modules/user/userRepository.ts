import mysql from "../../../database/client";

class UserRepository {
  async readUserDescriptionEvent(eventId: number) {
    const [rows] = await mysql.query(
      `
      SELECT
        e.event_name,
        euj.euj_id_user,
        r.reservation_id,
        b.budget_price

      FROM event AS e

      LEFT JOIN event_user_joining AS euj
        ON e.event_id = euj.euj_id_event

      LEFT JOIN reservation AS r
        ON e.event_id = r.reservation_id_event

      LEFT JOIN budget AS b
        ON e.event_id = b.budget_id_event

      WHERE e.event_id = ?
      `,
      [eventId],
    );

    return rows;
  }
  async readUserAndBudgetOnDashboard(eventId: number) {
    const [rows] = await mysql.query(
      `
        SELECT 
        user_name, 
        budget_price, 
        event_id

        FROM user AS u

        JOIN budget AS b 

        ON u.user_id = b.budget_id_user

        JOIN event AS e

        ON e.event_id = b.budget_id_event

        WHERE e.event_id = ?
      `,
      [eventId],
    );

    return rows;
  }
}

export default new UserRepository();

import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

type UserRow = {
  user_id: number;
  user_username: string;
  user_mail: string;
  user_password: string;
};

class UserRepository {
  async create(user: Omit<User, "id">) {
    const [result] = await databaseClient.query<Result>(
      `INSERT INTO user
      (user_name, user_username, user_mail, user_password, user_profile_picture)
      VALUES (?, ?, ?, ?, ?)`,
      [user.username, user.username, user.email, user.password, "default.png"],
    );

    return result.insertId;
  }

  async findByEmailOrUsername(identifier: string) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT *
       FROM user
       WHERE user_mail = ? OR user_username = ?`,
      [identifier, identifier],
    );

    return (rows[0] as UserRow) ?? null;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM user WHERE user_id = ?",
      [id],
    );

    const user = rows[0] as UserRow;

    if (!user) {
      return null;
    }

    return {
      id: user.user_id,
      username: user.user_username,
      email: user.user_mail,
      password: user.user_password,
    };
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM user");

    return (rows as UserRow[]).map((user) => ({
      id: user.user_id,
      username: user.user_username,
      email: user.user_mail,
      password: user.user_password,
    }));
  }
}

export default new UserRepository();

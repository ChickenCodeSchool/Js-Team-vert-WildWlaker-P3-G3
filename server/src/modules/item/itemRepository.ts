import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Item = {
  id: number;
  title: string;
  user_id: number;
};

class ItemRepository {
  async create(item: Omit<Item, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into item (title, user_id) values (?, ?)",
      [item.title, item.user_id],
    );
    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from item where id = ?",
      [id],
    );

    return rows[0] as Item;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from item");
    return rows as Item[];
  }
}

export default new ItemRepository();

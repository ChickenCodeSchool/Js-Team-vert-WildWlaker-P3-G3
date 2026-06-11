import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Gallery = {
  gallery_id: number;
  gallery_id_event: number;
  gallery_id_user: number;
  gallery_link: string;
  gallery_description: string | null;
  gallery_creation_date: string | null;
};

class GalleryRepository {
  async readAll(gallery_id_event: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT * 
      FROM gallery 
      WHERE gallery_id_event = ?
      ORDER BY gallery_creation_date DESC
      `,

      [gallery_id_event],
    );

    return rows as Gallery[];
  }

  async create(gallery: Omit<Gallery, "gallery_id" | "gallery_creation_date">) {
    const [result] = await databaseClient.query<Result>(
      `INSERT INTO gallery (
          gallery_id_event,
          gallery_id_user,
          gallery_link,
          gallery_description
        )
        VALUES (?, ?, ?, ?)`,
      [
        gallery.gallery_id_event,
        gallery.gallery_id_user,
        gallery.gallery_link,
        gallery.gallery_description,
      ],
    );

    return result.insertId;
  }

  async delete(gallery_id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM gallery WHERE gallery_id = ?",
      [gallery_id],
    );

    return result.affectedRows;
  }

  async updateDescription(gallery_id: number, gallery_description: string) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE gallery SET gallery_description = ? WHERE gallery_id = ?",
      [gallery_description, gallery_id],
    );

    return result.affectedRows;
  }
}

export default new GalleryRepository();

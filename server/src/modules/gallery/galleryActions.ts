import type { RequestHandler } from "express";

import galleryRepository from "./galleryRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const eventId = Number(req.params.eventId);

    const gallery = await galleryRepository.readAll(eventId);

    res.json(gallery);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newGallery = {
      gallery_id_event: req.body.gallery_id_event,

      gallery_id_user: req.body.gallery_id_user,

      gallery_link: req.body.gallery_link,

      gallery_description: req.body.gallery_description,
    };

    const insertId = await galleryRepository.create(newGallery);

    res.status(201).json({
      insertId,
    });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const resultAffectedRows = await galleryRepository.delete(
      Number(req.params.gallery_id),
    );

    res.status(200).json({
      resultAffectedRows,
    });
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  add,
  destroy,
};

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

const uploadPhoto: RequestHandler = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400).json({
        message: "Aucune image envoyée",
      });
      return;
    }

    const photoUrl = `/uploads/${req.file.filename}`;

    const newGallery = {
      gallery_id_event: Number(req.body.gallery_id_event),
      gallery_id_user: Number(req.body.gallery_id_user),
      gallery_link: photoUrl,
      gallery_description: req.body.gallery_description ?? null,
    };

    const insertId = await galleryRepository.create(newGallery);

    res.status(201).json({
      insertId,
      photoUrl,
    });
  } catch (error) {
    next(error);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const galleryId = Number(req.params.gallery_id);
    const description = req.body.gallery_description;

    const resultAffectedRows = await galleryRepository.updateDescription(
      galleryId,
      description,
    );

    if (resultAffectedRows === 0) {
      res.status(404).json({ message: "Photo introuvable" });
    } else {
      res.status(200).json({ message: "Description modifiée avec succès !" });
    }
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  add,
  destroy,
  uploadPhoto,
  edit,
};

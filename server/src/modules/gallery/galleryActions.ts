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
    const eventId = Number(req.body.gallery_id_event);
    const userId = Number(req.body.gallery_id_user);

    const permissions = await galleryRepository.checkUserPermissions(
      eventId,
      userId,
    );
    if (!permissions.isParticipant) {
      res.status(403).json({
        message: "Action interdite : vous devez participer à l'événement.",
      });
      return;
    }

    const newGallery = {
      gallery_id_event: eventId,
      gallery_id_user: userId,
      gallery_link: req.body.gallery_link,

      gallery_description: req.body.gallery_description,
    };

    const insertId = await galleryRepository.create(newGallery);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const uploadPhoto: RequestHandler = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "Aucune image envoyée" });
      return;
    }

    const eventId = Number(req.body.gallery_id_event);
    const userId = Number(req.body.gallery_id_user);

    const permissions = await galleryRepository.checkUserPermissions(
      eventId,
      userId,
    );
    if (!permissions.isParticipant) {
      res.status(403).json({
        message: "Action interdite : vous devez participer à l'événement.",
      });
      return;
    }

    const photoUrl = `/uploads/${req.file.filename}`;

    const newGallery = {
      gallery_id_event: eventId,
      gallery_id_user: userId,
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

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const galleryId = Number(req.params.gallery_id);

    const photo = await galleryRepository.read(galleryId);
    if (!photo) {
      res.status(404).json({ message: "Photo introuvable" });
      return;
    }

    const resultAffectedRows = await galleryRepository.delete(galleryId);
    res.status(200).json({ resultAffectedRows });
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const galleryId = Number(req.params.gallery_id);

    const description = req.body.gallery_description;

    const photo = await galleryRepository.read(galleryId);
    if (!photo) {
      res.status(404).json({ message: "Photo introuvable" });
      return;
    }
    await galleryRepository.updateDescription(galleryId, description);

    res.status(200).json({ message: "Description modifiée avec succès !" });
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

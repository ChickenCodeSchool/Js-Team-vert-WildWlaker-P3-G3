import type { RequestHandler } from "express";
import eventRepository from "./eventRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.query.userId);
    const events = await eventRepository.readAll(userId);
    res.json(events);
  } catch (error) {
    next(error);
  }
};

const add: RequestHandler = async (req, res, next) => {
  const {
    event_name,
    event_date,
    event_picture,
    event_host_id,
    event_description,
    event_location,
  } = req.body;

  if (!event_name || !event_date || !event_description || !event_location) {
    res.status(400).json({ message: "Veuillez remplir tous les champs." });
    return;
  }

  try {
    const insertId = await eventRepository.create({
      event_name,
      event_date,
      event_host_id,
      event_picture,
      event_description,
      event_location,
    });
    const newEvent = await eventRepository.read(insertId);
    res.status(201).json(newEvent);
  } catch (error) {
    next(error);
  }
};

const join: RequestHandler = async (req, res, next) => {
  const { event_link_key, user_id } = req.body;

  if (!event_link_key || !user_id) {
    res.status(400).json({ message: "Code et utilisateur requis." });
    return;
  }

  try {
    const event = await eventRepository.readByLinkKey(event_link_key);

    if (!event) {
      res
        .status(404)
        .json({ message: "Code invalide ou événement introuvable." });
      return;
    }

    await eventRepository.joinEvent(event.event_id, user_id);
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

export default { browse, add, join };

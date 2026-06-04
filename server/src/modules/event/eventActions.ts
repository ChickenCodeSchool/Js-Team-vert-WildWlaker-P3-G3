import type { RequestHandler } from "express";
import eventRepository from "./eventRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // const events = await eventRepository.browse();
    // res.json(events);
  } catch (error) {
    // res
    //   .status(500)
    //   .json({ message: "Erreur lors de la récupération des événements" });
  }
};

const add: RequestHandler = async (req, res) => {
  const {
    event_name,
    event_date,
    event_picture,
    event_host_id,
    event_description,
    event_location,
    event_link_id,
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
      event_link_id,
    });
    res.json(insertId);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l'événement" });
  }
};

export default { browse, add };

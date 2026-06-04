import type { RequestHandler } from "express";
import reservationRepository from "./reservationRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const eventId = Number(req.params.id);

    const event =
      await reservationRepository.readReservationDescriptionEvent(eventId);

    res.json(event);
  } catch (error) {
    next(error);
  }
};

export default {
  browse,
};

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
const readAllReservation: RequestHandler = async (req, res, next) => {
  try {
    const eventId = Number(req.params.id);

    const event = await reservationRepository.readAllReservation(eventId);

    res.json(event);
  } catch (error) {
    next(error);
  }
};
const addReservation: RequestHandler = async (req, res, next) => {
  try {
    const {
      reservation_id_event,
      reservation_id_user,
      reservation_name,
      reservation_date,
      reservation_location,
      reservation_description,
    } = req.body;

    const reservation_picture = req.file
      ? `/uploads/${req.file.filename}`
      : null;

    const event = await reservationRepository.addReservation({
      reservation_id_event,
      reservation_id_user,
      reservation_name,
      reservation_date,
      reservation_location,
      reservation_description,
      reservation_picture,
    });

    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};
const deleteReservation: RequestHandler = async (req, res, next) => {
  try {
    const reservationId = Number(req.params.id);

    await reservationRepository.deleteReservation(reservationId);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default {
  browse,
  readAllReservation,
  addReservation,
  deleteReservation,
};

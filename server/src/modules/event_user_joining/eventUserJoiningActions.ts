import type { RequestHandler } from "express";

import eventRepository from "../event/eventRepository";
import eventUserJoiningRepository from "./eventUserJoiningRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const eventId = await eventRepository.readIdByUuid(req.params.eventUuid);

    if (!eventId) {
      res.sendStatus(404);
      return;
    }

    const euj = await eventUserJoiningRepository.readAll(eventId);

    res.json(euj);
  } catch (err) {
    next(err);
  }
};

const browseUserEvent: RequestHandler = async (req, res, next) => {
  try {
    const event = await eventRepository.readIdByUuid(req.params.eventUuid);
    const user = Number(req.params.user);

    if (!event) {
      res.sendStatus(404);
      return;
    }

    const rows = await eventUserJoiningRepository.readBy(event, user);

    res.status(200).json({
      joined: rows.length > 0,
    });
  } catch (err) {
    next(err);
  }
};

const deleteAll: RequestHandler = async (req, res, next) => {
  try {
    const UserId = Number(req.params.id);
    const euj = await eventUserJoiningRepository.deleteAll(UserId);
    res.json(euj);
  } catch (err) {
    next(err);
  }
};

export default { browse, browseUserEvent, deleteAll };

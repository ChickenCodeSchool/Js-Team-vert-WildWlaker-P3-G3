import type { RequestHandler } from "express";

import eventUserJoiningRepository from "./eventUserJoiningRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const eventUserId = Number(req.params.eventId);
    const euj = await eventUserJoiningRepository.readAll(eventUserId);

    res.json(euj);
  } catch (err) {
    next(err);
  }
};

const browseUserEvent: RequestHandler = async (req, res, next) => {
  try {
    const event = Number(req.params.event);
    const user = Number(req.params.user);

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

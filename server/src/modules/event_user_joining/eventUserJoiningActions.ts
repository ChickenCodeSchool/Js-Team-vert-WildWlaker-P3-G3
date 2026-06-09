import type { RequestHandler } from "express";

import eventUserJoiningRepository from "./eventUserJoiningRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const eventUserId = Number(req.params.euj_id_event);
    const euj = await eventUserJoiningRepository.readAll(eventUserId);

    res.json(euj);
  } catch (err) {
    next(err);
  }
};

export default { browse };

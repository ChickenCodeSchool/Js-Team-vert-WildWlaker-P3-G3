import type { RequestHandler } from "express";
import reportEventRepository from "./reportEventRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const reported_event = await reportEventRepository.readAll();

    res.json(reported_event);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newReportEvent = {
      reported_event_id_event: req.body.reported_event_id_event,
      reported_event_description: req.body.reported_event_description,
      reported_event_image: req.body.reported_event_image,
      reported_event_by_id_user: req.body.reported_event_by_id_user,
    };

    const alreadyExists = await reportEventRepository.exists(
      newReportEvent.reported_event_by_id_user,
      newReportEvent.reported_event_id_event,
    );

    if (alreadyExists) {
      res
        .status(409)
        .json({ message: "Vous avez déjà signalé cet événement récemment." });
      return;
    }

    const insertId = await reportEventRepository.create(newReportEvent);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

export default { browse, add };

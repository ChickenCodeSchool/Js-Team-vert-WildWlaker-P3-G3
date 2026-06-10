import type { RequestHandler } from "express";
import reportUserRepository from "./reportUserRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const reported_user = await reportUserRepository.readAll();

    res.json(reported_user);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newReportUser = {
      reported_user_id_user: req.body.reported_user_id_user,
      reported_user_description: req.body.reported_user_description,
      reported_user_image: req.body.reported_user_image,
      reported_user_by_id_user: req.body.reported_user_by_id_user,
    };

    const insertId = await reportUserRepository.create(newReportUser);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

export default { browse, add };

import type { RequestHandler } from "express";
import reportBugRepository from "./reportBugRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const reported_bug = await reportBugRepository.readAll();

    res.json(reported_bug);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newReportBug = {
      reported_bug_description: req.body.reported_bug_description,
      reported_bug_image: req.body.reported_bug_image,
      reported_bug_by_id_user: req.body.reported_bug_by_id_user,
    };

    const insertId = await reportBugRepository.create(newReportBug);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

export default { browse, add };

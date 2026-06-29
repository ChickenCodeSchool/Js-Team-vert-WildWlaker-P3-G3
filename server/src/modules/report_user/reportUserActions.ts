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
    const files = req.files as Express.Multer.File[] | undefined;
    const imagePaths = files?.map((file) => file.filename) ?? [];

    const newReportUser = {
      reported_user_id_user: req.body.reported_user_id_user,
      reported_user_description: req.body.reported_user_description,
      reported_user_by_id_user: req.body.reported_user_by_id_user,
    };

    const alreadyExists = await reportUserRepository.exists(
      newReportUser.reported_user_by_id_user,
      newReportUser.reported_user_id_user,
    );

    if (alreadyExists) {
      res
        .status(409)
        .json({ message: "Vous avez déjà signalé cet utilisateur récemment." });
      return;
    }

    const insertId = await reportUserRepository.create(
      newReportUser,
      imagePaths,
    );

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

export default { browse, add };

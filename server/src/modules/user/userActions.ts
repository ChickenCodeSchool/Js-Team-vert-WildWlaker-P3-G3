import type { RequestHandler } from "express";
import userRepository from "./userRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const eventId = Number(req.params.id);

    const event = await userRepository.readUserDescriptionEvent(eventId);

    res.json(event);
  } catch (error) {
    next(error);
  }
};

const browseUserAndBudget: RequestHandler = async (req, res, next) => {
  try {
    const eventId = Number(req.params.id);

    const event = await userRepository.readUserAndBudgetOnDashboard(eventId);

    res.json(event);
  } catch (error) {
    next(error);
  }
};

export default {
  browse,
  browseUserAndBudget,
};

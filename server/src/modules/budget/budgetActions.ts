import type { RequestHandler } from "express";

// Import access to data
import budgetRepository from "./budgetRepository";

// The R of BREAD - Read operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch specific budget based on the provided event ID
    const eventId = Number(req.params.id);
    const budget = await budgetRepository.readByEvent(eventId);

    res.json(budget);

    // Error
  } catch (err) {
    next(err);
  }
};

const browseTotalUser: RequestHandler = async (req, res, next) => {
  try {
    // Fetch specific budget based on the provided event ID
    const eventId = Number(req.params.id);
    const budget = await budgetRepository.readAllTotalBudgetByEvent(eventId);

    res.json(budget);

    // Error
  } catch (err) {
    next(err);
  }
};

const browseUser: RequestHandler = async (req, res, next) => {
  try {
    const eventId = Number(req.params.id_event);
    const userId = Number(req.params.id_user);
    const budget = await budgetRepository.readBudgetInfoByUser(eventId, userId);

    res.json(budget);

    // Error
  } catch (err) {
    next(err);
  }
};

const browseEvent: RequestHandler = async (req, res, next) => {
  try {
    const eventId = Number(req.params.id);
    const budget = await budgetRepository.readBudgetInfoEvent(eventId);

    res.json(budget);

    // Error
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  browseTotalUser,
  browseUser,
  browseEvent,
};

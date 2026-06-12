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

const create: RequestHandler = async (req, res, next) => {
  try {
    const event = Number(req.query.id_event);
    const user = Number(req.query.id_user);
    const name = String(req.query.name);
    const price = Number(req.query.price);

    const budget = await budgetRepository.create(event, user, name, price);

    res.json(budget);

    // Error
  } catch (err) {
    next(err);
  }
};

const update: RequestHandler = async (req, res, next) => {
  try {
    const id_budget = Number(req.query.id_budget);
    const name = String(req.query.name);
    const price = Number(req.query.price);

    const budget = await budgetRepository.update(id_budget, name, price);

    res.json(budget);

    // Error
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const budget = await budgetRepository.delete(id);

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
  create,
  update,
  destroy,
};

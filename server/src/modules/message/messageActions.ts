import type { RequestHandler } from "express";
import { getIo } from "../../socket";
import eventRepository from "../event/eventRepository";
import messageRepository from "./messageRepository";

const addMessage: RequestHandler = async (req, res, next) => {
  try {
    const eventId = await eventRepository.readIdByUuid(req.params.eventUuid);
    const { userId, messagesUser } = req.body;

    if (!eventId) {
      res.sendStatus(404);
      return;
    }

    const result = await messageRepository.sendMessage(
      eventId,
      userId,
      messagesUser,
    );

    const io = getIo();
    io.to(`event-${req.params.eventUuid}`).emit("new-message", result);
    res.status(201).json(result);
  } catch (error) {
    console.error("messageActions.addMessage erreur", error);
    next(error);
  }
};
const browseMessagesByEventId: RequestHandler = async (req, res, next) => {
  try {
    const eventId = await eventRepository.readIdByUuid(req.params.eventUuid);

    if (!eventId) {
      res.sendStatus(404);
      return;
    }

    const messages = await messageRepository.getMessagesByEventId(eventId);

    res.json(messages);
  } catch (error) {
    console.error("messageActions.browseMessagesByEventId erreur", error);
    next(error);
  }
};
const notificationMessage: RequestHandler = async (req, res, next) => {
  try {
    const eventId = await eventRepository.readIdByUuid(req.params.eventUuid);
    const { userId } = req.body;

    if (!eventId) {
      res.sendStatus(404);
      return;
    }

    await messageRepository.notificationMessage(eventId, userId);

    const message = await messageRepository.getMessagesByEventId(eventId);

    res.status(201).json(message);
  } catch (error) {
    console.error("messageActions.addMessage erreur", error);
    next(error);
  }
};
const getUnreadMessages: RequestHandler = async (req, res, next) => {
  try {
    const eventId = await eventRepository.readIdByUuid(req.params.eventUuid);
    const userId = Number(req.params.userId);

    if (!eventId) {
      res.sendStatus(404);
      return;
    }

    const count = await messageRepository.getUnreadMessages(eventId, userId);

    res.status(200).json({ count });
  } catch (error) {
    next(error);
  }
};
export default {
  addMessage,
  browseMessagesByEventId,
  notificationMessage,
  getUnreadMessages,
};

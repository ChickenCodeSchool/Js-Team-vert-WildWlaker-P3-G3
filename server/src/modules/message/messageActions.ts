import type { RequestHandler } from "express";
import { getIo } from "../../socket";
import messageRepository from "./messageRepository";

const addMessage: RequestHandler = async (req, res, next) => {
  try {
    const eventId = Number(req.params.id);
    const { userId, messagesUser } = req.body;

    const result = await messageRepository.sendMessage(
      eventId,
      userId,
      messagesUser,
    );

    const io = getIo();
    console.log("Emission socket vers :", `event-${eventId}`);
    io.to(`event-${eventId}`).emit("new-message", result);

    res.status(201).json(result);
  } catch (error) {
    console.error("messageActions.addMessage erreur", error);
    next(error);
  }
};
const browseMessagesByEventId: RequestHandler = async (req, res, next) => {
  try {
    const eventId = Number(req.params.id);

    const messages = await messageRepository.getMessagesByEventId(eventId);
    res.json(messages);
  } catch (error) {
    console.error("messageActions.browseMessagesByEventId erreur", error);
    next(error);
  }
};
const notificationMessage: RequestHandler = async (req, res, next) => {
  try {
    const eventId = Number(req.params.id);
    const { userId } = req.body;

    await messageRepository.notificationMessage(eventId, userId);

    const message = await messageRepository.getMessagesByEventId(eventId);

    res.status(201).json(message);
  } catch (error) {
    console.error("messageActions.addMessage erreur", error);
    next(error);
  }
};

export default {
  addMessage,
  browseMessagesByEventId,
  notificationMessage,
};

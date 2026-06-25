import type { RequestHandler } from "express";
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
export default {
  addMessage,
  browseMessagesByEventId,
};

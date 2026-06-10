import express from "express";

import eventActions from "./modules/event/eventActions";
import itemActions from "./modules/item/itemActions";
import messageActions from "./modules/message/messageActions";
import reservationActions from "./modules/reservation/reservationActions";
import todoActions from "./modules/todo/todoActions";
import userActions from "./modules/user/userActions";

const router = express.Router();

// messages routes
router.get("/api/messages/:id", messageActions.browseMessagesByEventId);
router.post("/api/messages/:id", messageActions.addMessage);

// reservations routes
router.get("/api/reservations/:id", reservationActions.browse);

// items routes
router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

// EventActions routes
// router.get("/api/users/:id/events", userActions.getUserEvents);
router.post("/api/events/join", eventActions.join);
router.get("/api/events", eventActions.browse);
router.post("/api/events", eventActions.add);

// todoActions routes
router.get("/api/todo/:eventId", todoActions.browse);
router.post("/api/todo", todoActions.add);
router.put("/api/todo/:todo_id", todoActions.edit);
router.delete("/api/todo/:todo_id", todoActions.destroy);

// userActions routes
router.get("/api/users/:id", userActions.browse);
router.get("/api/users/:id/userAndBudget", userActions.browseUserAndBudget);
router.get("/api/users", userActions.browseInscription);
router.get("/api/users/:id", userActions.read);
router.post("/api/login", userActions.login);
router.post("/api/auth/forgot-password", userActions.forgotPassword);
router.post("/api/auth/reset-password", userActions.resetPassword);
router.post("/api/users", userActions.add);

// reportActions routes

export default router;

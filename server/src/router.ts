import express from "express";
import multer from "multer";
import eventActions from "./modules/event/eventActions";

const router = express.Router();
const upload = multer({
  dest: "public/uploads/",
});
/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";
import messageActions from "./modules/message/messageActions";
import reservationActions from "./modules/reservation/reservationActions";
import userActions from "./modules/user/userActions";
router.put("/api/users/:id", userActions.editUserName);
router.post("/api/users", userActions.add);
router.get("/api/users", userActions.browseInscription);
// router.get("/api/users/:id", userActions.read);
router.put("/api/users/change-password", userActions.forgotPassword);
router.post("/api/messages/:id", messageActions.addMessage);
router.get("/api/messages/:id", messageActions.browseMessagesByEventId);
router.get("/api/reservations/:id", reservationActions.browse);
router.get("/api/users/:id", userActions.browse);
router.get("/api/users/:id/userAndBudget", userActions.browseUserAndBudget);
router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.get("/api/:id/photo", userActions.browsePhoto);
router.get("/:id", userActions.browse);
router.post("/api/items", itemActions.add);
router.post(
  "/api/users/photo",
  upload.single("photo"),
  userActions.uploadPhoto,
);
// routes for create events
// router.get("/api/users/:id/events", userActions.getUserEvents);
router.get("/api/events", eventActions.browse);
router.post("/api/events", eventActions.add);

/* ************************************************************************* */
// todoActions routes
import todoActions from "./modules/todo/todoActions";

router.get("/api/todo/:eventId", todoActions.browse);
router.post("/api/todo", todoActions.add);
router.put("/api/todo/:todo_id", todoActions.edit);
router.delete("/api/todo/:todo_id", todoActions.destroy);

router.post("/api/login", userActions.login);
router.post("/api/auth/forgot-password", userActions.forgotPassword);
router.post("/api/auth/reset-password", userActions.resetPassword);

export default router;

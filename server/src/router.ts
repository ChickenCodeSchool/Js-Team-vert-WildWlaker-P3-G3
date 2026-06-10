import express from "express";
import multer from "multer";
import eventActions from "./modules/event/eventActions";

const router = express.Router();
const upload = multer({
  dest: "public/uploads/",
});

import adminActions from "./modules/admin/adminActions";
import galleryActions from "./modules/gallery/galleryActions";
import itemActions from "./modules/item/itemActions";
import messageActions from "./modules/message/messageActions";
import reservationActions from "./modules/reservation/reservationActions";
import todoActions from "./modules/todo/todoActions";
import userActions from "./modules/user/userActions";

router.put("/api/todo/:todo_id", todoActions.edit);
router.put("/api/users/:id", userActions.editUserName);
router.put("/api/users/change-password", userActions.forgotPassword);

router.get("/api/admin/reportUser", adminActions.readReportUser);
router.get("/api/admin/reportBug", adminActions.readReportBug);
router.get("/api/admin/reportEvent", adminActions.readReportEvent);
router.get("/api/admin/dashboard-chart", adminActions.readDashboardChart);
router.get("/api/admin/arrayUser", adminActions.readArrayUsers);
router.get("/api/admin/arrayReport", adminActions.readArrayReport);
router.get("/api/admin/events", adminActions.readAllEvents);
router.get("/api/admin/users", adminActions.readAllUsers);
router.get("/api/users", userActions.browseInscription);
router.get("/api/messages/:id", messageActions.browseMessagesByEventId);
router.get("/api/reservations/:id", reservationActions.browse);
router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.get("/api/:id/photo", userActions.browsePhoto);
router.get("/:id", userActions.browse);
router.get("/api/events", eventActions.browse);
router.get("/api/todo/:eventId", todoActions.browse);
router.get("/api/gallery/:eventId", galleryActions.browse);
router.get("/api/users/:id", userActions.browse);
router.get("/api/users/:id/userAndBudget", userActions.browseUserAndBudget);
router.get("/api/users", userActions.browseInscription);
router.get("/api/users/:id", userActions.read);

router.delete("/api/todo/:todo_id", todoActions.destroy);
router.delete("/api/gallery/:gallery_id", galleryActions.destroy);

router.post("/api/users", userActions.add);
router.post("/api/messages/:id", messageActions.addMessage);
router.post("/api/items", itemActions.add);
router.post("/api/messages/:id", messageActions.addMessage);
router.post("/api/events", eventActions.add);
router.post("/api/gallery", galleryActions.add);
router.post("/api/todo", todoActions.add);
router.post("/api/login", userActions.login);
router.post("/api/auth/forgot-password", userActions.forgotPassword);
router.post("/api/auth/reset-password", userActions.resetPassword);
router.post("/api/users", userActions.add);
router.post(
  "/api/users/photo",
  upload.single("photo"),
  userActions.uploadPhoto,
);

export default router;

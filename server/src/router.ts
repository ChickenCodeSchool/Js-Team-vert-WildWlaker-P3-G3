import express from "express";
import multer from "multer";
import authorization from "../src/middleware/auth";
import adminActions from "./modules/admin/adminActions";
import budgetActions from "./modules/budget/budgetActions";
import eventActions from "./modules/event/eventActions";
import eventUserJoiningActions from "./modules/event_user_joining/eventUserJoiningActions";
import galleryActions from "./modules/gallery/galleryActions";
import itemActions from "./modules/item/itemActions";
import messageActions from "./modules/message/messageActions";
import reportBugActions from "./modules/report_bug/reportBugActions";
import reportEventActions from "./modules/report_event/reportEventActions";
import reportUserActions from "./modules/report_user/reportUserActions";
import reservationActions from "./modules/reservation/reservationActions";
import todoActions from "./modules/todo/todoActions";
import userActions from "./modules/user/userActions";

const router = express.Router();
const upload = multer({ dest: "public/uploads/" });

router.get("/api/auth/authVerif", authorization, userActions.authVerif);

router.get("/api/users", authorization, userActions.browseInscription);
router.get("/api/username/:id", authorization, userActions.readUserName);

router.get(
  "/api/users/description/:eventUuid",
  authorization,
  userActions.readUserDescriptionEvent,
);

router.get("/api/users/:id", authorization, userActions.read);
router.get(
  "/api/users/:eventUuid/userAndBudget",
  authorization,
  userActions.browseUserAndBudget,
);

router.post("/api/users", userActions.add);
router.get("/api/users/:id/photo", authorization, userActions.browsePhoto);
router.post(
  "/api/users/:id/photo",
  authorization,
  upload.single("photo"),
  userActions.uploadPhoto,
);
router.post("/api/login", userActions.login);
router.post("/api/logout", userActions.logout);
router.post("/api/auth/forgot-password", userActions.forgotPassword);
router.post("/api/auth/reset-password", userActions.resetPassword);
router.put(
  "/api/auth/change-password",
  authorization,
  userActions.changePassword,
);
router.put("/api/users/:id", authorization, userActions.editUserName);
router.put(
  "/api/users/change-password",
  authorization,
  userActions.forgotPassword,
);
router.get("/api/users/admin/:id", authorization, userActions.browseUserAdmin);
router.get(
  "/api/user/event/:eventUuid",
  authorization,
  userActions.readUserJoinEvent,
);

router.get(
  "/api/messages/:eventUuid",
  authorization,
  messageActions.browseMessagesByEventId,
);
router.post(
  "/api/messages/:eventUuid",
  authorization,
  messageActions.addMessage,
);
router.post(
  "/api/messages/notification/:eventUuid",
  authorization,
  messageActions.notificationMessage,
);
router.get(
  "/api/messages/unread/:eventUuid/:userId",
  authorization,
  messageActions.getUnreadMessages,
);

router.get(
  "/api/reservations/:eventUuid",
  authorization,
  reservationActions.browse,
);
router.get(
  "/api/reservations/all/:eventUuid",
  authorization,
  reservationActions.readAllReservation,
);
router.post(
  "/api/reservations",
  authorization,
  upload.single("reservation_picture"),
  reservationActions.addReservation,
);
router.put(
  "/api/reservations/update/:id",
  authorization,
  upload.single("reservation_picture"),
  reservationActions.updateReservation,
);
router.delete(
  "/api/reservations/delete/:id",
  authorization,
  reservationActions.deleteReservation,
);

router.get("/api/items", authorization, itemActions.browse);
router.get("/api/items/:id", authorization, itemActions.read);
router.post("/api/items", authorization, itemActions.add);

router.get("/api/events", authorization, eventActions.browse);
router.get(
  "/api/events/name/:eventUuid",
  authorization,
  eventActions.readEventName,
);
router.get("/api/events/images", authorization, eventActions.browseImages);
router.get("/api/events/uuid/:uuid", authorization, eventActions.readByUuid);
router.get("/events/uuid/:uuid", authorization, eventActions.readByUuid);
router.get("/api/events/:eventUuid", authorization, eventActions.read);
router.post("/api/events/join", authorization, eventActions.join);
router.post("/api/events", authorization, eventActions.add);
router.put(
  "/api/events/:eventUuid/",
  authorization,
  upload.single("picture"),
  eventActions.edit,
);
router.delete(
  "/api/event/delete/:eventUuid",
  authorization,
  eventActions.deleteEvent,
);
router.get(
  "/api/event/host/:eventUuid",
  authorization,
  eventActions.readEventHostId,
);

router.get("/api/todo/:eventUuid", authorization, todoActions.browse);
router.post("/api/todo", authorization, todoActions.add);
router.put("/api/todo/:todo_id", authorization, todoActions.edit);
router.delete("/api/todo/:todo_id", authorization, todoActions.destroy);

router.get("/api/gallery/:eventUuid", authorization, galleryActions.browse);

router.post(
  "/api/gallery",
  authorization,
  upload.single("photo"),
  galleryActions.uploadPhoto,
);

router.post("/api/gallery", authorization, galleryActions.add);
router.delete(
  "/api/gallery/:gallery_id/:userId",
  authorization,
  galleryActions.destroy,
);
router.put(
  "/api/gallery/:gallery_id/:userId",
  authorization,
  galleryActions.edit,
);

router.get(
  "/api/gallery/:eventUuid/likes/:userId",
  authorization,
  galleryActions.getLikedPhotos,
);
router.post("/api/gallery/:id/like", authorization, galleryActions.addLike);
router.delete(
  "/api/gallery/:id/like/:userId",
  authorization,
  galleryActions.removeLike,
);

router.get("/api/userreport-user", authorization, reportUserActions.browse);
router.post(
  "/api/userreport-user",
  authorization,
  upload.array("reported_user_image"),
  reportUserActions.add,
);

router.get("/api/userreport-bug", authorization, reportBugActions.browse);
router.post(
  "/api/userreport-bug",
  authorization,
  upload.array("reported_bug_image"),
  reportBugActions.add,
);

router.get("/api/userreport-event", authorization, reportEventActions.browse);
router.post(
  "/api/userreport-event",
  authorization,
  upload.array("reported_event_image"),
  reportEventActions.add,
);

router.get(
  "/api/events/:eventUuid/users",
  authorization,
  eventUserJoiningActions.browse,
);
router.get(
  "/api/user-in-event/:eventUuid/:user",
  authorization,
  eventUserJoiningActions.browseUserEvent,
);
router.delete(
  "/api/euj/delete/:id",
  authorization,
  eventUserJoiningActions.deleteAll,
);

router.get("/api/admin/reportUser", authorization, adminActions.readReportUser);
router.get("/api/admin/reportBug", authorization, adminActions.readReportBug);
router.get(
  "/api/admin/reportEvent",
  authorization,
  adminActions.readReportEvent,
);
router.get(
  "/api/admin/dashboard-chart",
  authorization,
  adminActions.readDashboardChart,
);
router.get(
  "/api/admin/dashboard-years",
  authorization,
  adminActions.readAvailableYears,
);
router.get("/api/admin/arrayUser", authorization, adminActions.readArrayUsers);
router.get(
  "/api/admin/arrayReport",
  authorization,
  adminActions.readArrayReport,
);
router.get("/api/admin/events", authorization, adminActions.readAllEvents);
router.get("/api/admin/users", authorization, adminActions.readAllUsers);

router.get(
  "/api/admin/reportBug/:id",
  authorization,
  adminActions.readReportBugById,
);
router.get(
  "/api/admin/reportEvent/:id",
  authorization,
  adminActions.readReportEventById,
);
router.get(
  "/api/admin/reportUser/:id",
  authorization,
  adminActions.readReportUserById,
);

router.patch(
  "/api/admin/reportBug/:id/done",
  authorization,
  adminActions.markBugAsDone,
);
router.patch(
  "/api/admin/reportEvent/:id/done",
  authorization,
  adminActions.markEventAsDone,
);
router.patch(
  "/api/admin/reportUser/:id/done",
  authorization,
  adminActions.markUserAsDone,
);

router.patch("/api/admin/ban-user/:id", authorization, adminActions.banUser);
router.patch("/api/admin/ban-event/:id", authorization, adminActions.banEvent);
router.patch(
  "/api/admin/event-ban/:eventId/:userId",
  authorization,
  adminActions.banUserFromEvent,
);

router.get("/api/budget/:eventUuid", authorization, budgetActions.browse);
router.get(
  "/api/budget/:eventUuid/totalUsers",
  authorization,
  budgetActions.browseTotalUser,
);

router.get(
  "/api/budget/user/:eventUuid/:id_user",
  authorization,
  budgetActions.browseUser,
);
router.get(
  "/api/budget/event/:eventUuid",
  authorization,
  budgetActions.browseEvent,
);

router.post("/api/budget/add", authorization, budgetActions.create);
router.put("/api/budget/update", authorization, budgetActions.update);
router.delete("/api/budget/:id", authorization, budgetActions.destroy);

export default router;

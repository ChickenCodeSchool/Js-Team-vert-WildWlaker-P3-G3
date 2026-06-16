import express from "express";
import multer from "multer";

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

/* ************************************************************************* */

// user routes
router.get("/api/users", userActions.browseInscription);
router.get("/api/username/:id", userActions.readUserName);
// router.get("/api/users/:id", userActions.read); // TODO: à réactiver après vérification
// router.get("/api/users/:id/events", userActions.getUserEvents); // TODO: à implémenter ????
// TODO: vérifier avec l'équipe — deux routes identiques sur /api/users/:id
// userActions.browse -> à confirmer : liste filtrée ou profil ?
router.get("/api/users/description/:id", userActions.readUserDescriptionEvent);
// userActions.read -> à confirmer : profil utilisateur unique ?
router.get("/api/users/:id", userActions.read);
router.get("/api/users/:id/userAndBudget", userActions.browseUserAndBudget);
// router.get("/:id", userActions.browse); browse pas declaré
router.post("/api/users", userActions.add);
router.get("/api/users/:id/photo", userActions.browsePhoto);
router.post(
  "/api/users/:id/photo",
  upload.single("photo"),
  userActions.uploadPhoto,
);
router.post("/api/login", userActions.login);
router.post("/api/auth/forgot-password", userActions.forgotPassword);
router.post("/api/auth/reset-password", userActions.resetPassword);
router.put("/api/auth/change-password", userActions.changePassword);
router.put("/api/users/:id", userActions.editUserName);
router.put("/api/users/change-password", userActions.forgotPassword);
router.get("/api/users/admin/:id", userActions.browseUserAdmin);
// event routes
// router.get("/api/users/:id/events", userActions.getUserEvents); // TODO: à implémenter ????
router.get("/api/events", eventActions.browse);
router.post("/api/events", eventActions.add);

// message routes
router.get("/api/messages/:id", messageActions.browseMessagesByEventId);
router.post("/api/messages/:id", messageActions.addMessage);

// reservation routes
router.get("/api/reservations/:id", reservationActions.browse);

// item routes
router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
// > post
router.post("/api/items", itemActions.add);

// EventActions routes
// router.get("/api/users/:id/events", userActions.getUserEvents);
router.get("/api/events", eventActions.browse);
router.get("/api/events/random-image", eventActions.browseRandomImage);
router.get("/api/events/images", eventActions.browseImages);
router.post("/api/events/join", eventActions.join);
router.post("/api/events", eventActions.add);
router.put("/api/events/:id/picture", eventActions.editPicture);

// todoActions routes
router.get("/api/todo/:eventId", todoActions.browse);
router.post("/api/todo", todoActions.add);
router.put("/api/todo/:todo_id", todoActions.edit);
router.delete("/api/todo/:todo_id", todoActions.destroy);

// gallery routes
router.get("/api/gallery/:eventId", galleryActions.browse);

router.post("/api/gallery", upload.single("photo"), galleryActions.uploadPhoto);

router.post("/api/gallery", galleryActions.add);
router.delete("/api/gallery/:gallery_id/:userId", galleryActions.destroy);
router.put("/api/gallery/:gallery_id/:userId", galleryActions.edit);
// report user routes
router.get("/api/userreport-user", reportUserActions.browse);
router.post("/api/userreport-user", reportUserActions.add);

router.get("/api/userreport-bug", reportBugActions.browse);
router.post("/api/userreport-bug", reportBugActions.add);

router.get("/api/userreport-event", reportEventActions.browse);
router.post("/api/userreport-event", reportEventActions.add);

// event user joining route
router.get("/api/events/:eventId/users", eventUserJoiningActions.browse);

// admin route
router.get("/api/admin/reportUser", adminActions.readReportUser);
router.get("/api/admin/reportBug", adminActions.readReportBug);
router.get("/api/admin/reportEvent", adminActions.readReportEvent);
router.get("/api/admin/dashboard-chart", adminActions.readDashboardChart);
router.get("/api/admin/arrayUser", adminActions.readArrayUsers);
router.get("/api/admin/arrayReport", adminActions.readArrayReport);
router.get("/api/admin/events", adminActions.readAllEvents);
router.get("/api/admin/users", adminActions.readAllUsers);

// --> budget
// > get
router.get("/api/budget/:id", budgetActions.browse);
router.get("/api/budget/:id/totalUsers", budgetActions.browseTotalUser);
router.get("/api/budget/user/:id_event/:id_user", budgetActions.browseUser);
router.get("/api/budget/event/:id", budgetActions.browseEvent);
// > post
router.post("/api/budget/add", budgetActions.create);
// > put
router.put("/api/budget/update", budgetActions.update);
// > delete
router.delete("/api/budget/:id", budgetActions.destroy);

export default router;

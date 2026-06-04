import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";
import messageActions from "./modules/message/messageActions";
import reservationActions from "./modules/reservation/reservationActions";
import userActions from "./modules/user/userActions";

router.post("/api/users", userActions.add);
router.get("/api/users", userActions.browseInscription);
router.get("/api/users/:id", userActions.read);

router.post("/api/messages/:id", messageActions.addMessage);
router.get("/api/messages/:id", messageActions.browseMessagesByEventId);
router.get("/api/reservations/:id", reservationActions.browse);
router.get("/api/users/:id", userActions.browse);
router.get("/api/users/:id/userAndBudget", userActions.browseUserAndBudget);
router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

/* ************************************************************************* */

router.post("/api/login", userActions.login);
router.post("/api/auth/forgot-password", userActions.forgotPassword);
router.post("/api/auth/reset-password", userActions.resetPassword);

export default router;

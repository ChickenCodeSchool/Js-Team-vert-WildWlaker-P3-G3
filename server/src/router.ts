import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import budgetActions from "./modules/budget/budgetActions";
// Define item-related routes
import itemActions from "./modules/item/itemActions";
import reservationActions from "./modules/reservation/reservationActions";
import userActions from "./modules/user/userActions";

// --> budget
// > get
router.get("/api/budget/:id", budgetActions.browse);
router.get("/api/budget/:id/totalUsers", budgetActions.browseTotalUser);
router.get("/api/budget/user/:id_event/:id_user", budgetActions.browseUser);
router.get("/api/budget/event/:id", budgetActions.browseEvent);
// > post
router.post("/api/budget/add", budgetActions.create);
router.post("/api/budget/update", budgetActions.update);
router.post("/api/budget/delete", budgetActions.del);

// --> reservation
// > get
router.get("/api/reservations/:id", reservationActions.browse);

// --> user
// > get
router.get("/api/users/:id", userActions.browse);
router.get("/api/users/:id/userAndBudget", userActions.browseUserAndBudget);

// --> api
// > get
router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
// > post
router.post("/api/items", itemActions.add);

/* ************************************************************************* */

export default router;

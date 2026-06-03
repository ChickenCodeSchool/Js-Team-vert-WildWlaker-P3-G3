import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

/* ************************************************************************* */
import userActions from "./modules/user/userActions";
router.post("/api/users", userActions.add);
router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.read);
router.post("/api/login", userActions.login);

export default router;

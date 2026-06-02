import express from "express";

import eventActions from "./modules/event/eventActions";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

// routes for create events
router.get("/api/events", eventActions.browse);
router.post("/api/events", eventActions.add);

/* ************************************************************************* */

export default router;

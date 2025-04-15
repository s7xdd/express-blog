import { Router } from "express";
import { stripeController } from "../controllers/stripe-controller";

const stripeRoutes = Router();

stripeRoutes.post("/create-checkout-session", stripeController.createCheckoutSession);

stripeRoutes.get("/session-status", stripeController.getSessionStatus);

export default stripeRoutes;

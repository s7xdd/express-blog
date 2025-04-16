import { Router } from "express";
import { stripeController } from "../controllers/stripe-controller";

const stripeRoutes = Router();

//Embedded Checkout Routes
stripeRoutes.post("/create-checkout-session", stripeController.createCheckoutSession);
stripeRoutes.get("/session-status", stripeController.getSessionStatus);


//Embedded card entering form Routes
stripeRoutes.post("/create-payment-intent", stripeController.createPaymentIntent);
stripeRoutes.post("/payment-status", stripeController.checkPaymentStatus);

export default stripeRoutes;

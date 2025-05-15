import { Router } from "express";
import { stripeController } from "../controllers/stripe-controller";

const stripeRoutes = Router();

//Embedded Checkout Routes
stripeRoutes.post("/create-checkout-session", stripeController.createCheckoutSession);
stripeRoutes.get("/session-status", stripeController.getSessionStatus);


//Embedded card entering form Routes
stripeRoutes.post("/create-setup-intent", stripeController.createSetupIntent);
stripeRoutes.post("/create-payment-intent", stripeController.createPaymentIntent);
stripeRoutes.post("/payment-status", stripeController.checkPaymentStatus);
stripeRoutes.post("/create-and-attach-payment-method", stripeController.createAndAttachPaymentMethod);
stripeRoutes.post("/check-setup-intent-status", stripeController.checkSetupIntentStatus);
stripeRoutes.post("/check-payment-intent-status", stripeController.checkPaymentIntentStatus);

stripeRoutes.post("/success", stripeController.handleSuccess);

export default stripeRoutes;

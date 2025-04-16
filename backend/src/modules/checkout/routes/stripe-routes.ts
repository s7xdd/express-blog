import { Router } from "express";
import { stripeController } from "../controllers/stripe-controller";
import { validateData } from "../../../shared/middlewares/common-middleware";
import { lineItemValidationSchema } from "../validators/checkout-validator";

const stripeRoutes = Router();

stripeRoutes.post("/create-checkout-session", stripeController.createCheckoutSession);

stripeRoutes.get("/session-status", stripeController.getSessionStatus);


//Embedded card entering form
stripeRoutes.post("/create-payment-intent", stripeController.createPaymentIntent);



export default stripeRoutes;

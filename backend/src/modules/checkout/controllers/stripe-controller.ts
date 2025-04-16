import { ResponseHandler } from "../../../shared/components/response-handler/response-handler";
import { createPayload } from "../../../shared/utils/helper/common-functions";
import { calculateOrderAmount } from "../functions/checkout-functions";
import { stripeServices } from "../services/stripe-service";
import { StripePaymentIntentProps } from "../types/stripe-types";

const stripe = require("stripe")(process.env.STRIPE_KEY);

export const stripeController = {
  //Embedded Checkout Form
  async createCheckoutSession(req: any, res: any, next: any) {
    try {
      const data = {
        line_items: [
          {
            price_data: {
              unit_amount: 400000,
              currency: "usd",
              product_data: {
                name: "Test Product",
              },
            },
            quantity: 1,
          },
        ],
        customer_email: "test@gmail.com",
      };

      const session = await stripeServices.createSession(data);

      res.send({ clientSecret: session.client_secret });
    } catch (error) {
      next(error);
    }
  },

  async getSessionStatus(req: any, res: any) {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

    res.send({
      status: session.status,
      customer_email: session.customer_details!.email,
    });
  },

  async fulfillCheckout(sessionId: any) {
    console.log("Fulfilling Checkout Session " + sessionId);
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    if (checkoutSession.payment_status !== "unpaid") {
    }
  },

  //Embedded card entering form
  async createPaymentIntent(req: any, res: any) {
    const { id } = req.body;

    const paymentIntent = await stripeServices.createPaymentIntent({ id });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  },

  //Send Payment Status
  async checkPaymentStatus(req: any, res: any, next: any) {
    try {
      const { payment_intent } = req.body;
      const response: StripePaymentIntentProps = await stripeServices.checkStripeStatus(payment_intent);

      const payload = createPayload(response, [
        "id",
        "amount",
        "amount_capturable",
        "amount_received",
        "currency",
        "payment_method",
        "status",
      ]);

      ResponseHandler.success({
        res,
        message: "success",
        data: payload,
      });
    } catch (error) {
      next(error);
    }
  },
};

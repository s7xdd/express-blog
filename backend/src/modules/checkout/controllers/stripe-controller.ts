import { calculateOrderAmount } from "../functions/checkout-functions";
import { stripeServices } from "../services/stripe-service";

const stripe = require("stripe")(
  "sk_test_51RE8j4RifjQEyrRHRwpDUsoyVzOI7qYyyobTLQBVjRzkuUqr0ZcvAptC33ENXhs6Lk3rixsSb7WyrwhbPvn72OQf00QRuU2jwp"
);

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

    console.log("id", id);

    const paymentIntent = await stripeServices.createPaymentIntent(id);

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  },
};

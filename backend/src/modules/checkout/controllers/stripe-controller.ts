const stripe = require("stripe")(
  "sk_test_51RE8j4RifjQEyrRHRwpDUsoyVzOI7qYyyobTLQBVjRzkuUqr0ZcvAptC33ENXhs6Lk3rixsSb7WyrwhbPvn72OQf00QRuU2jwp"
);

const YOUR_DOMAIN = process.env.SERVER_BASE_URL;

export const stripeController = {
  async createCheckoutSession(req: any, res: any) {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      customer_email: "customer@example.com",
      submit_type: "auto",
      billing_address_collection: "auto",
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      line_items: [
        {
          price: "price_1REBF6RifjQEyrRHa62nkLtB",
          quantity: 1,
        },
      ],
      mode: "payment",
      return_url: `${YOUR_DOMAIN}/api/v1/checkout/return.html?session_id={CHECKOUT_SESSION_ID}`,
    });

    res.send({ clientSecret: session.client_secret });
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
};

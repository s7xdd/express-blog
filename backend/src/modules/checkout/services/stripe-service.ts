const stripe = require("stripe")(
  "sk_test_51RE8j4RifjQEyrRHRwpDUsoyVzOI7qYyyobTLQBVjRzkuUqr0ZcvAptC33ENXhs6Lk3rixsSb7WyrwhbPvn72OQf00QRuU2jwp"
);

import { calculateOrderAmount } from "../functions/checkout-functions";
import { StripeCheckoutFormProps } from "../types/stripe-types";

export const stripeServices = {
  //FOR EMBEDDED UI
  async createSession(data: StripeCheckoutFormProps) {
    try {
      const session = await stripe.checkout.sessions.create({
        ui_mode: "embedded",
        customer_email: data.customer_email,
        submit_type: "auto",
        billing_address_collection: "auto",
        phone_number_collection: { enabled: true },
        shipping_address_collection: {
          allowed_countries: ["US", "CA"],
        },
        line_items: data.line_items,
        mode: "payment",
        return_url: `${process.env.STRIPE_RETURN_URL}`,
      });
      return session;
    } catch (error) {
      throw error;
    }
  },

  //FOR EMBEDDED INPUT FORM
  async createPaymentIntent(items: any) {
    const paymentIntent = await stripe.paymentIntents.create({
      // amount: calculateOrderAmount(items),
      amount: 1000,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    return paymentIntent;
  },
};

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_KEY!);

export const checkoutController = {
  async createPayment(req: any, res: any, next: any) {
    stripe.customers
      .create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: "John Doe",
        address: { 
          line1: "123 Main Street",
          postal_code: "12345",
          city: "Anytown",
          state: "California",
          country: "USA",
        },
      })
      .then((customer) => {
        return stripe.charges
          .create({
            amount: 3500,
            description: "Web Development Service",
            currency: "USD",
            customer: customer.id,
          })
          .then((charge) => {
            res.send("<h2>Success</h2>");
          })
          .catch((err) => {
            res.send(err);
          });
      });
  },
};

const stripe = require('stripe')('sk_test_51RE8j4RifjQEyrRHRwpDUsoyVzOI7qYyyobTLQBVjRzkuUqr0ZcvAptC33ENXhs6Lk3rixsSb7WyrwhbPvn72OQf00QRuU2jwp');

import { calculateOrderAmount } from '../functions/checkout-functions';
import { CreatePaymentIntentParams, CreatePaymentMethodParams, CreateSetupIntentParams, CreateSubscriptionParams, StripeCheckoutFormProps } from '../types/stripe-types';

export const stripeServices = {
  //FOR EMBEDDED UI
  async createSession(data: StripeCheckoutFormProps) {
    try {
      const session = await stripe.checkout.sessions.create({
        ui_mode: 'embedded',
        customer_email: data.customer_email,
        submit_type: 'auto',
        billing_address_collection: 'auto',
        phone_number_collection: { enabled: true },
        shipping_address_collection: {
          allowed_countries: ['US', 'CA'],
        },
        line_items: data.line_items,
        mode: 'payment',
        return_url: `${process.env.STRIPE_RETURN_URL}`,
      });
      return session;
    } catch (error) {
      throw error;
    }
  },

  //FOR EMBEDDED INPUT FORM
  async createPaymentIntent({ amount, currency, stripeCustomerId }: CreatePaymentIntentParams) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        confirm: false,
        customer: stripeCustomerId,
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: 'never',
        },
      });
      return paymentIntent;
    } catch (error: any) {
      throw new Error(`Failed to create payment intent: ${error.message}`);
    }
  },

  async createSetupIntent({ customerId }: CreateSetupIntentParams) {
    try {
      const setupIntent = await stripe.setupIntents.create({
        customer: customerId,
        payment_method_types: ['card'],
        usage: 'off_session',
      });
      console.log('Created Setup Intent:', setupIntent.id);
      return setupIntent;
    } catch (error: any) {
      throw new Error(`Failed to create setup intent: ${error.message}`);
    }
  },

  async checkSetupIntentStatus(setupIntentId: string) {
    try {
      const setupIntent = await stripe.setupIntents.retrieve(setupIntentId);
      return setupIntent;
    } catch (error: any) {
      throw new Error(`Failed to retrieve setup intent: ${error.message}`);
    }
  },

  async checkPaymentIntentStatus(paymentIntentId: string) {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      return paymentIntent;
    } catch (error: any) {
      throw new Error(`Failed to retrieve payment intent: ${error.message}`);
    }
  },

  async checkStripeStatus(payment_intent: string) {
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);
    return paymentIntent;
  },

  async createCustomer(email: string) {
    try {
      const customer = await stripe.customers.create({ email });
      return customer;
    } catch (error: any) {
      throw new Error(`Failed to create customer: ${error.message}`);
    }
  },

  async createAndAttachPaymentMethod({ paymentMethodId, email }: CreatePaymentMethodParams) {
    try {
      const customer = await stripe.customers.create({ email });
      await stripe.paymentMethods.attach(paymentMethodId, { customer: customer.id });
      await stripe.customers.update(customer.id, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });
      return { customerId: customer.id, paymentMethodId };
    } catch (error: any) {
      throw new Error(`Failed to create and attach payment method: ${error.message}`);
    }
  },

  async attachPaymentMethod(customerId: string, paymentMethodId: string) {
    try {
      await stripe.paymentMethods.attach(paymentMethodId, { customer: customerId });
      await stripe.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });
    } catch (error: any) {
      throw new Error(`Failed to attach payment method: ${error.message}`);
    }
  },

  async createSubscription({ customerId, priceId, paymentMethodId }: CreateSubscriptionParams) {
    try {
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        payment_behavior: 'default_incomplete',
        default_payment_method: paymentMethodId,
      });
      return subscription;
    } catch (error: any) {
      throw new Error(`Failed to create subscription: ${error.message}`);
    }
  },
};

import { ResponseHandler } from '../../../shared/components/response-handler/response-handler';
import { createPayload } from '../../../shared/utils/helper/common-functions';
import { calculateOrderAmount } from '../functions/checkout-functions';
import { stripeServices } from '../services/stripe-service';
import { StripePaymentIntentProps, StripeSetupIntentProps } from '../types/stripe-types';

const stripe = require('stripe')(process.env.STRIPE_KEY);

const stripeCustomerId = 'cus_SJatPcnkWqqrY3';

export const stripeController = {
  //Embedded Checkout Form
  async createCheckoutSession(req: any, res: any, next: any) {
    try {
      const data = {
        line_items: [
          {
            price_data: {
              unit_amount: 400000,
              currency: 'usd',
              product_data: {
                name: 'Test Product',
              },
            },
            quantity: 1,
          },
        ],
        customer_email: 'test@gmail.com',
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
    console.log('Fulfilling Checkout Session ' + sessionId);
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    });

    if (checkoutSession.payment_status !== 'unpaid') {
    }
  },

  //Embedded card entering form
  async createPaymentIntent(req: any, res: any, next: any) {
    try {
      const { amount, currency } = req.body;
      if (!amount || !currency) {
        throw new Error('Missing required fields: amount or currency');
      }
      const paymentIntent = await stripeServices.createPaymentIntent({
        amount,
        currency,
        stripeCustomerId: stripeCustomerId,
      });

      console.log('paymentIntent', paymentIntent);

      ResponseHandler.success({
        res,
        message: 'Payment Intent created successfully',
        data: {
          clientSecret: paymentIntent.client_secret,
          paymentIntentId: paymentIntent.id,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async createSetupIntent(req: any, res: any, next: any) {
    try {
      const { email } = req.body;
      if (!email) {
        throw new Error('Missing required field: email');
      }
      const setupIntent = await stripeServices.createSetupIntent({
        customerId: stripeCustomerId,
      });

      ResponseHandler.success({
        res,
        message: 'Setup Intent created successfully',
        data: {
          clientSecret: setupIntent.client_secret,
          setupIntentId: setupIntent.id,
          customerId: stripeCustomerId,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async createAndAttachPaymentMethod(req: any, res: any, next: any) {
    try {
      const { paymentMethodId, email } = req.body;
      if (!paymentMethodId || !email) {
        throw new Error('Missing required fields: paymentMethodId or email');
      }
      const { customerId, paymentMethodId: attachedPaymentMethodId } = await stripeServices.createAndAttachPaymentMethod({
        paymentMethodId,
        email,
      });

      ResponseHandler.success({
        res,
        message: 'Payment method created and attached successfully',
        data: {
          customerId,
          paymentMethodId: attachedPaymentMethodId,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async checkPaymentStatus(req: any, res: any, next: any) {
    try {
      const { payment_intent } = req.body;
      if (!payment_intent) {
        throw new Error('Missing payment_intent ID');
      }
      const response: StripePaymentIntentProps = await stripeServices.checkStripeStatus(payment_intent);
      const payload = createPayload(response, ['id', 'amount', 'amount_capturable', 'amount_received', 'currency', 'payment_method', 'status']);

      ResponseHandler.success({
        res,
        message: 'Payment status retrieved',
        data: payload,
      });
    } catch (error) {
      next(error);
    }
  },

  async checkPaymentIntentStatus(req: any, res: any, next: any) {
    try {
      const { payment_intent } = req.body;
      if (!payment_intent) {
        throw new Error('Missing payment_intent ID');
      }
      const response: StripePaymentIntentProps = await stripeServices.checkPaymentIntentStatus(payment_intent);
      const payload = createPayload(response, ['id', 'amount', 'currency', 'status', 'payment_method', 'customer']);

      ResponseHandler.success({
        res,
        message: 'Payment Intent status retrieved',
        data: payload,
      });
    } catch (error) {
      next(error);
    }
  },

  async checkSetupIntentStatus(req: any, res: any, next: any) {
    try {
      const { setup_intent } = req.body;
      if (!setup_intent) {
        throw new Error('Missing setup_intent ID');
      }
      const response: StripeSetupIntentProps = await stripeServices.checkSetupIntentStatus(setup_intent);
      const payload = createPayload(response, ['id', 'status', 'payment_method', 'customer']);

      ResponseHandler.success({
        res,
        message: 'Setup Intent status retrieved',
        data: payload,
      });
    } catch (error) {
      next(error);
    }
  },

  async handleSuccess(req: any, res: any, next: any) {
    try {
      const { paymentIntentId, customerId, priceId, paymentMethodId } = req.body;
      if (!paymentIntentId || !customerId || !priceId || !paymentMethodId) {
        throw new Error('Missing required fields: paymentIntentId, customerId, priceId, or paymentMethodId');
      }

      // Verify payment intent status
      const paymentIntent = await stripeServices.checkStripeStatus(paymentIntentId);
      if (paymentIntent.status !== 'succeeded') {
        throw new Error('Payment not successful');
      }

      await stripeServices.attachPaymentMethod(customerId, paymentMethodId);

      const subscription = await stripeServices.createSubscription({
        customerId: customerId,
        priceId,
        paymentMethodId,
      });

      const payload = createPayload(subscription, ['id', 'status', 'customer', 'current_period_end']);
      const clientSecret = subscription.latest_invoice?.payment_intent?.client_secret || null;

      ResponseHandler.success({
        res,
        message: 'Customer and subscription created successfully',
        data: {
          ...payload,
          clientSecret,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};

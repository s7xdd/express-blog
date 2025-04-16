export interface StripeCheckoutFormProps {
  customer_email: string;
  line_items: Array<{
    price_data: {
      unit_amount: number;
      currency: string;
      product_data: {
        name: string;
      };
    };
    quantity: number;
  }>;
}

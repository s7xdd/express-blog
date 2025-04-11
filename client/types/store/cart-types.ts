export interface CartStateProps {
  cart: CartProps | null;
  addToCart: (cartData: AddToCartProps) => Promise<{ data: CartProps; error: any }>;
  getCart: () => Promise<{ data: CartProps; error: any }>;
  updateCart: (cartData: AddToCartProps) => Promise<{ data: CartProps; error: any }>;
}

export interface CurrencyProps {
  currency_code: string;
  currency_symbol: string;
  currency_symbol_pos: string;
  currency_minor_unit: number | null;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
}

export interface CartProps {
  items: CartItemProps[];
  coupons: [];
  fees: [];
  totals: {
    total_items: string;
    total_items_tax: string;
    total_fees: string;
    total_fees_tax: string;
    total_discount: string;
    total_discount_tax: string;
    total_shipping: string;
    total_shipping_tax: string;
    total_price: string;
    total_tax: string;
    tax_lines: [];
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
  };
  shipping_address: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    phone: string;
  };
  billing_address: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    email: string;
    phone: string;
  };
  needs_payment: boolean;
  needs_shipping: boolean;
  payment_requirements: string[];
  has_calculated_shipping: boolean;
  shipping_rates: [];
  items_count: number;
  items_weight: number;
  cross_sells: [];
  errors: [];
  payment_methods: [];
  extensions: {};
}

export interface CartItemProps {
  key: string;
  id: number;
  type: "variation";
  quantity: number;
  quantity_limits: {
    minimum: number;
    maximum: number;
    multiple_of: number;
    editable: boolean;
  };
  name: string;
  short_description: string;
  description: string;
  sku: string;
  low_stock_remaining: number | null;
  backorders_allowed: boolean;
  show_backorder_badge: boolean;
  sold_individually: boolean;
  permalink: string;
  images: {
    id: number;
    src: string;
    thumbnail: string;
    srcset: string;
    sizes: string;
    name: string;
    alt: string;
  }[];
  variation: { attribute: string; value: string }[];
  item_data: any[];
  prices: {
    price: string;
    regular_price: string;
    sale_price: string;
    price_range: string | null;
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
    raw_prices: {
      precision: number;
      price: string;
      regular_price: string;
      sale_price: string;
    };
  };
  totals: {
    line_subtotal: string;
    line_subtotal_tax: string;
    line_total: string;
    line_total_tax: string;
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
  };
  catalog_visibility: string;
  extensions: { [key: string]: any };
}

export interface AddToCartProps {
  id: any;
  quantity: number;
}

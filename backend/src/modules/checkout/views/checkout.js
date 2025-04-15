const stripe = Stripe(
  "pk_test_51RE8j4RifjQEyrRH2L5zfMScdfOKUFMpbXBX7LHPducj0ZclSpllyjf5PxmsnoHhpYL6ED6wLpgxY6AJO9r9NHzb004IEQFDN2"
);

initialize();

async function initialize() {
  const fetchClientSecret = async () => {
    const response = await fetch("/api/v1/checkout/create-checkout-session", {
      method: "POST",
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  const checkout = await stripe.initEmbeddedCheckout({
    fetchClientSecret,
  });

  // Mount Checkout
  checkout.mount("#checkout");
}

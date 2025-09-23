import Stripe from 'stripe';

//@ts-expect-error not using stripe for now
export const stripeServer: Readonly<Stripe> = {}; /* Object.freeze(
  new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2025-07-30.basil'
  })
); */

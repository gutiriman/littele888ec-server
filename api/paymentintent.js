const stripeAPI = require('../stripe');

function calculateOrderAmount(cartItems) {
   return cartItems.reduce((total, product) => {
      return total + product.price * product.quantity;
   }, 0) * 100;
}

async function paymentIntent(req, res) {
   const { cartItems, payment_description, receipt_email, shipping } = req.body;

   let paymentIntent;

   try {
      paymentIntent = await stripeAPI.paymentIntents.create({
         //params are defined by stripe. adding params other than definiton has no effect.
         //so, like 
         amount: calculateOrderAmount(cartItems),
         currency: 'usd',
         description: payment_description,
         payment_method_types: ['card'],
         receipt_email,
         shipping
      });

      res.status(200).json({
         clientSecret: paymentIntent.client_secret,
         id: paymentIntent.id
      })
   } catch (err) {
      console.log(err.message);
      res.status(400).json({ error: 'unable to create payment intent' })
   }
}

module.exports = paymentIntent;
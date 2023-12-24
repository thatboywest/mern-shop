const express = require("express");
const Stripe = require("stripe");
const stripe = new Stripe(
  "sk_test_51ON8h3Hwz0NhG2u4PyXcbuxdp6BjLL0UzLDLc4jPLBJ9VsPngVE94gjvDlCALicHtRZ5txrUYpqB0Pw5IYRSrts300nfD9tIGe"
);

const router = express.Router();
router.use(express.json());
router.post("/create-checkout-session", async (req, res) => {
  console.log("Received request body:", req.body);
  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          description: item.desc,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: `http://localhost:3000/checkout-succes`,
    cancel_url: `http://localhost:3000/cart`,
  });
  res.json({ url: session.url });
});

module.exports = router;

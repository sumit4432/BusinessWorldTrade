const express = require("express");
const { AddItemsToCart } = require("../controller/cart");

const { requireSignin, userMiddleware } = require("../common-middleware");
const router = express.Router();

router.post(
  "/user/cart/addtocart",
  requireSignin,
  userMiddleware,
  AddItemsToCart
);

module.exports = router;

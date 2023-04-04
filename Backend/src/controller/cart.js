const Cart = require("../models/cart");

exports.AddItemsToCart = async (req, res) => {
  try {
    const { product, quantity } = req.body.cartItems;
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      // If cart exists, update it by quantity
      const existingCartItem = cart.cartItems.find(
        (c) => c.product.toString() === product.toString()
      );
      if (existingCartItem) {
        existingCartItem.quantity += quantity;
      } else {
        cart.cartItems.push(req.body.cartItems);
      }
      const updatedCart = await cart.save();
      return res.status(201).json({ cart: updatedCart });
    } else {
      // If cart doesn't exist, create a new cart
      const newCart = new Cart({
        user: req.user._id,
        cartItems: [req.body.cartItems],
      });
      const savedCart = await newCart.save();
      return res.status(201).json({ cart: savedCart });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

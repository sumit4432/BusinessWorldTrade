const express = require("express");
const { signup, signin } = require("../controller/auth");

const {
  validateSignupRequest,
  isRequestValidates,
  validateSigninRequest,
} = require("../validators/auth");

const router = express.Router();

router.post("/signin", validateSigninRequest, isRequestValidates, signin);
router.post("/signup", validateSignupRequest, isRequestValidates, signup);

// router.post("/profile", requireSignin, (req, res) => {
//   res.status(200).json({ user: "profile" });
// });

module.exports = router;

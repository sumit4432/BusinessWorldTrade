const express = require("express");
const { requireSignin } = require("../../common-middleware/index");
const { signup, signin, signout } = require("../../controller/admin/auth");
const {
  validateSignupRequest,
  isRequestValidates,
  validateSigninRequest,
} = require("../../validators/auth");
const router = express.Router();

router.post("/admin/signin", validateSigninRequest, isRequestValidates, signin);
router.post("/admin/signup", validateSignupRequest, isRequestValidates, signup);
router.post("/admin/signout", signout);

module.exports = router;

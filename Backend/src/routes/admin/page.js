const express = require("express");
const router = express.Router();

const {
  upload,
  requireSignin,
  adminMiddleware,
} = require("../../common-middleware");

const { createPage } = require("../../controller/admin/page");

router.post(
  `/page/create`,
  requireSignin,
  adminMiddleware,
  upload.fields([{ name: "banners" }, { name: "products" }]),
  createPage
);

module.exports = router;

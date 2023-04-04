const express = require("express");
const { upload } = require("../../common-middleware");
const { createPage } = require("../../controller/admin/page");
const router = express.Router();

router.post(
  `/page/create`,
  upload.fields([
    { name: "banners", maxCount: 1 },
    { name: "products", maxCount: 8 },
  ]),
  createPage
);

module.exports = router;

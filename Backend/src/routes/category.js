const express = require("express");
const { requireSignin, adminMiddleware } = require("../common-middleware");
const multer = require("multer");
const {
  addCategory,
  getCategories,
  updateCategories,
  deleteCategories,
} = require("../controller/category");
const router = express.Router();
const shortid = require("shortid");
const path = require("path");
const category = require("../models/category");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/category/create",
  requireSignin,
  adminMiddleware,
  upload.single("categoryImage"), // change "myFile" to "categoryImage"
  addCategory
);

router.get("/category/getcategory", getCategories);

router.post("/category/update", upload.array("categoryImage"), (req, res) => {
  if (typeof updateCategories === "function") {
    updateCategories(req, res);
  } else {
    res.status(500).send("Error: updateCategories function is undefined");
  }
});

router.post("/category/delete", deleteCategories);

// Error handling middleware for Multer
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({ message: "Unexpected field" });
  } else {
    next(err);
  }
});

module.exports = router;

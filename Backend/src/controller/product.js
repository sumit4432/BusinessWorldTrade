const Product = require("../models/product");
const shortid = require("shortid");
const slugify = require("slugify");
const Category = require("../models/category");
const category = require("../models/category");
exports.createProduct = async (req, res) => {
  const { name, price, description, category, quntity, createdBy } = req.body;

  let productPicture = [];

  if (req.files && req.files.length > 0) {
    productPicture = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  try {
    const product = await Product.create({
      name: name,
      slug: slugify(name),
      price,
      description,
      productPicture,
      category,
      quntity,
      createdBy: req.user._id,
    });
    res.status(201).json({ product });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getProductsBySlug = (req, res) => {
  const { slug } = req.params;
  let category;

  Category.findOne({ slug: slug })
    .select("_id")
    .exec()
    .then((result) => {
      category = result;
      return Product.find({ category: category._id }).exec();
    })
    .then((products) => {
      res.status(200).json({ category, products });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

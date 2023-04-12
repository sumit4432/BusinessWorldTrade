const Category = require("../models/category");
const Product = require("../models/product");
const slugify = require("slugify");
const shortid = require("shortid");
const category = require("../models/category");
const product = require("../models/product");

exports.createProduct = async (req, res) => {
  const { name, price, description, category, quantity, createdBy } = req.body;

  let productPicture = [];
  if (req.files.length > 0) {
    productPicture = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    description,
    productPicture,
    category,
    quantity,
    createdBy: req.user._id,
  });

  try {
    const savedProduct = await product.save();
    res.status(201).json({ product: savedProduct });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getProductsBySlug = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const products = await Product.find({ category })
      .populate("category")
      .exec();

    if (product.length > 0) {
      res.status(200).json({
        products,
        productByPrice: {
          under5k: products.filter((product) => product.price <= 5000),
          under10k: products.filter(
            (product) => product.price > 5000 && product.price <= 10000
          ),
          under15k: products.filter(
            (product) => product.price > 100000 && product.price <= 15000
          ),
          under20k: products.filter(
            (product) => product.price > 15000 && product.price <= 20000
          ),
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

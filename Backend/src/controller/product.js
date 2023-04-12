const Category = require("../models/category");
const Product = require("../models/product");
const slugify = require("slugify");
const shortid = require("shortid");

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
    const products = await Product.find({
      category: await Category.findOne({ slug: req.params.slug }),
    })
      .populate("category")
      .exec();
    res.status(200).json({
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Something went wrong",
    });
  }
};

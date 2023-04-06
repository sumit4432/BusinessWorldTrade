//
const Page = require("../../models/page");
exports.createPage = async (req, res) => {
  const { banners, products } = req.files;

  if (banners.length > 0) {
    req.body.banners = banners.map((banner, index) => ({
      img: `${process.env.API}/public/${banner.filename}`,
      navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`,
    }));
  }

  if (products.length > 0) {
    req.body.products = products.map((product, index) => ({
      img: `${process.env.API}/public/${product.filename}`,
      navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`,
    }));
  }

  const page = new Page(req.body);

  res.status(200).json({ body: req.body });
};

const Page = require("../../models/page");

exports.createPage = async (req, res) => {
  try {
    const { banners, products } = req.files;
    if (banners && banners.length > 0) {
      req.body.banners = banners.map((banner) => ({
        img: banner.filename,
        navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`,
      }));
    }
    if (products && products.length > 0) {
      req.body.products = products.map((product) => ({
        img: product.filename,
        navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`,
      }));
    }
    req.body.createdBy = req.user._id;

    const page = new Page(req.body);
    const savedPage = await page.save();
    res.status(201).json({ page: savedPage });
  } catch (error) {
    res.status(400).json({ error });
  }
};

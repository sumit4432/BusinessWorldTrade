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

    Page.findOne({ category: req.body.category }).exec((error, page) => {
      if (error) {
        res.status(400).json({ error });
      }
      if (page) {
        Page.findOneAndUpdate({ category: req.body.category }, req.body).exec(
          (error, updatedPage) => {
            if (error) {
              res.status(400).json({ error });
            }
            if (updatedPage) {
              res.status(201).json({ page: updatedPage });
            }
          }
        );
      }
    });

    const page = new Page(req.body);
    const savedPage = await page.save();
    res.status(201).json({ page: savedPage });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getPage = (req, res) => {
  const { category, type } = req.params;
  if (type === "page") {
    Page.findOne({ category: category }).exec((error, page) => {
      if (error) res.status(200).json({ error });
      if (page) res.status(201).json({ page });
    });
  }
};

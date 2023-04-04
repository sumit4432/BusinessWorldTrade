const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },
    categoryImage: { type: String },
    parentId: {
      type: String,
    },

    type: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("category", CategorySchema);

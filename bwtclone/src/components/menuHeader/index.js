import React, { useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../actions/category_actions";

const MenuHeader = () => {
  const category = useSelector((state) => state.category);
  const productType = useSelector((state) => state.productType); // declare and initialize productType
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  const renderCategories = (categories) => {
    let categoryItems = [];
    for (let category of categories) {
      categoryItems.push(
        <li key={category._id}>
          {category.parentId ? (
            <a
              href={`${category.slug}?cid=${category._id}&type=${category.type}&productType=${productType}`}
            >
              {category.name}
            </a>
          ) : (
            <span>{category.name}</span>
          )}

          {category.children && category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return categoryItems;
  };

  return (
    <>
      <div className="menuHeader">
        <ul>
          {category.categories.length > 0
            ? renderCategories(category.categories)
            : null}
        </ul>
      </div>
    </>
  );
};

export default MenuHeader;

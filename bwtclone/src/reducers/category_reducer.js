import { categoryConstants } from "../actions/constant";

const initState = {
  categories: [],
  loading: false,
  error: null,
};

// create new category

const buildNewCategories = (parentId, categories, category) => {
  let myCategories = [];

  if (parentId === undefined) {
    return [
      ...categories,
      {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        children: [],
      },
    ];
  }
  for (let cat of categories) {
    if (cat._id === parentId) {
      myCategories.push({
        ...cat,
        children: cat.children
          ? buildNewCategories(
              parentId,
              [
                ...cat.children,
                {
                  _id: category._id,
                  name: category.name,
                  slug: category.slug,
                  parentId: category.parentId,
                  children: category.children,
                },
              ],
              category
            )
          : [],
      });
    } else {
      myCategories.push({
        ...cat,
        children: cat.children
          ? buildNewCategories(parentId, cat.children, category)
          : [],
      });
    }
  }
  return myCategories;
};

const categoryReducer = (state = initState, action) => {
  switch (action.type) {
    case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
      state = {
        ...state,
        categories: action.payload.categories,
      };
      break;

    case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: false,
      };
      break;

    case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
      const category = action.payload.category;
      const updateCategories = buildNewCategories(
        category.parentId,
        state.categories,
        category
      );
      console.log("update category ", updateCategories);
      state = {
        ...state,
        categories: updateCategories,
        loading: false,
      };
      break;
    case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
      state = {
        ...initState,
      };
      break;
  }

  return state;
};

export default categoryReducer;

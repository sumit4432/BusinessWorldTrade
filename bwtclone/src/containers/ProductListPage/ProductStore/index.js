import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions/Product_action";

const ProductStore = (props) => {
  const product = useSelector((state) => state.product);

  const [priceRange, setpriceRange] = useState({
    under5k: 5000,
    under5k: 5000,
    under5k: 5000,
    under5k: 5000,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(props);
    const { match } = props;
    dispatch(getProductsBySlug(match.params.slug));
  }, [dispatch]);

  return (
    <div>
      {product.name}
      <div className="card">
        ProductListPage
        <div className="cardHeader">
          <div>SamSung Mobile</div>
          <button>view all</button>
        </div>
        <div>
          <div className="productContainer">
            <div className="productImgContainer">
              <img
                src="https://images.unsplash.com/photo-1679343316332-6b854e892a44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
                alt="name"
              />
            </div>
            <div className="prodductInfo">
              <div style={{ margin: "5px 0" }}>Product category</div>
              <div>
                <span>4.5</span>&nbsp;
                <span>32323</span>
              </div>
              <div className="productPrice">50000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductStore;

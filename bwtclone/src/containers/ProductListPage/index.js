import Layout from "../../components/Layout";
import ProductStore from "./ProductStore";
import "./style.css";

const ProductListPage = (props) => {
  return (
    <>
      <Layout>
        <ProductStore />
      </Layout>
    </>
  );
};

export default ProductListPage;

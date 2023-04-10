import Layout from "../../components/Layout";
import QueryString from "../../utils/getParams";
import ProductStore from "./ProductStore";
import "./style.css";

const ProductListPage = (props) => {
  const renderProduct = () => {
    console.log(props);
    const param = QueryString(props.location.search);
    console.log(param);
  };
  return (
    <>
      <Layout>
        <ProductStore {...props} />
        {renderProduct()}
      </Layout>
    </>
  );
};

export default ProductListPage;

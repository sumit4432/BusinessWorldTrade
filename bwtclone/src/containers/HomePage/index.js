import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProductsBySlug } from "../../actions";
import Layout from "../../components/Layout/index";

const Home = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsBySlug());
  }, []);
  return (
    <>
      <Layout>Home Page</Layout>
    </>
  );
};

export default Home;

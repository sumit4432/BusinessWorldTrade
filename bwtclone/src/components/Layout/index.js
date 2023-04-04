import React from "react";
import Header from "../header";
import MenuHeader from "../menuHeader";

const Layout = (props) => {
  return (
    <>
      <Header />
      <MenuHeader />
      {props.children}
    </>
  );
};

export default Layout;

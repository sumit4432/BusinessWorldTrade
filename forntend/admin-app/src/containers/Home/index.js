import React from "react";
import Layout from "../../components/Layout";
import "./style.css";
import { Col, Row } from "react-bootstrap";

/**
 * @author
 * @function Home
 **/

const Home = (props) => {
  return (
    <Layout sidebar>
      <Row
        style={{ justifyContent: "center", fontSize: "40px", marginTop: "10%" }}
      >
        <Col md="auto">WELCOME TO DASBOARD</Col>
      </Row>
      <p
        style={{
          justifyContent: "center",
          fontSize: "14px",
          textAlign: "center",
        }}
      >
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here', making it
        look like readable English. Many desktop publishing packages and web
        page editors now use Lorem Ipsum as their default model text, and a sear
      </p>

      {/* <Jumbotron style={{margin: '5rem', background: '#fff'}} className="text-center">
            <h1>Welcome to Admin Dashboard</h1>
            
        </Jumbotron> */}
    </Layout>
  );
};

export default Home;

import React, { useState } from "react";

import { Form, Button, Container, Row, Col } from "react-bootstrap";

import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../actions/user_actions";
import Layout from "../../components/Layout";
import { Input } from "../../components/UI/Input";

export const Signup = () => {
  const [firstName, setFristName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const userSignup = (e) => {
    e.preventDefault();

    const user = {
      firstName,
      lastName,
      password,
      email,
    };

    dispatch(signup(user));
  };

  if (auth.authenticate) {
    return <Redirect to={"/"} />;
  }

  if (user.loading) {
  }
  return (
    <>
      <Layout>
        <Container>
          {/* {user.message} */}
          <Row style={{ marginTop: "50px" }}>
            <Col md={{ span: 6, offset: 3 }}>
              <Form onSubmit={userSignup}>
                <Row>
                  <Col md={5}>
                    <Input
                      Label="First Name"
                      placeholder="fistName"
                      value={firstName}
                      type="text"
                      onChange={(e) => setFristName(e.target.value)}
                    />
                  </Col>
                  <Col md={5}>
                    <Input
                      Label="Last Name"
                      placeholder="lastName"
                      value={lastName}
                      type="text"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Col>
                </Row>
                <Form.Group>
                  <Input
                    Label="Email"
                    placeholder="Email"
                    value={email}
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Input
                    Label="Password"
                    placeholder="Password"
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  style={{ marginTop: "1rem" }}
                >
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  );
};

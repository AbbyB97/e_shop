import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, FormData, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userAction";

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message,setMessage] = useState(null)

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password!==confirmPassword){
        setMessage('passwords do not match')
    }else{
        dispatch(register(name,email, password));

    }
  };

  return (
    <FormContainer>
      <h1>Sign up</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
      <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            placeholder="enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email Adress</Form.Label>
          <Form.Control
            placeholder="enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            placeholder="enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          ></Form.Control>
         
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>confirm Password</Form.Label>
          <Form.Control
            placeholder="enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
          ></Form.Control>
         
        </Form.Group>
         <Button type="submit" variant="primary">
            Register
          </Button>
        <Row className="py-3">
          <Col>
            Already a user?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
            >login</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};
export default RegisterScreen;

import axios from "axios";
import React, { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { baseUrl } from "../../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../App";

const Register = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const data = {
      name,
      email,
      password,
    };
    await axios.post(baseUrl + "/user/register", data).then((res) => {
      if (res.data.status) {
        navigate("/");
        localStorage.setItem("token", res.data.token);
        setUser(res.data.result)
      } else {
        toast.error(res.data.message);
      }
    });
  };
  return (
    <div className="mb-5">
      <Form onSubmit={handleRegister} className="form-style text-start">
        <h3 className="text-center">Register</h3>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            name="name"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
          />
        </Form.Group>
        <Button
          className="mx-auto d-block btn-dark"
          variant="dark"
          type="submit"
        >
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;

import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import "./AddTodos.css";
import axios from "axios";
import { baseUrl } from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddTodos = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleAdd = async (e) => {
    e.preventDefault();
    const data = {
      name,
      desc,
      date,
    };
    await axios
      .post(baseUrl + "/products", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res?.data?.message);
          setName("");
          setDate("");
          setDesc("");
          navigate("/todos");
        } else {
          toast.success(res?.data?.message);
        }
      });
  };

 
  return (
    <div>
      <Container>
        <Form className="text-start form-style" onSubmit={handleAdd}>
          <h4 className="text-center">Add Todo</h4>
          <Form.Group
            controlId="validationFormik101"
            className="position-relative mb-3"
          >
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              className="shadow-none p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            controlId="validationFormik101"
            className="position-relative mb-3"
          >
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              name=""
              className="shadow-none p-2"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="position-relative mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              required
              name="date"
              className="shadow-none"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </Form.Group>

          <button className="mb-2 d-block mx-auto add-btn">Add</button>
        </Form>
      </Container>
    </div>
  );
};

export default AddTodos;

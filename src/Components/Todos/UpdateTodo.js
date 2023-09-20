import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "./Todos.css";
import axios from "axios";
import { baseUrl } from "../../services/api";
import { toast } from "react-toastify";
const UpdateTodo = ({ show, handleClose, selectedId, refetch, setRefetch }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(baseUrl + `/products/${selectedId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res?.data?.status) {
          setName(res?.data?.data?.name);
          setDesc(res?.data?.data?.desc);
        } else {
          toast.error(res.data.message);
        }
      });
  }, [selectedId, token]);
  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = {
      name,
      desc,
    };
    await axios
      .patch(baseUrl + `/products/${selectedId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res?.data?.message);
          setRefetch(refetch + 1);
          handleClose();
        } else {
          toast.success(res?.data?.message);
        }
      });
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Form className="text-start form-style-update" onSubmit={handleUpdate}>
        <h4 className="text-center">Update Inventory</h4>
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
            type="text"
            as={'textarea'}
            name=""
            className="shadow-none p-2"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </Form.Group>

        <button className="mb-2 d-block mx-auto update-btn">Update</button>
        <button
          onClick={handleClose}
          className="mb-2 d-block mx-auto delete-btn"
        >
          Cancel
        </button>
      </Form>
    </Modal>
  );
};

export default UpdateTodo;

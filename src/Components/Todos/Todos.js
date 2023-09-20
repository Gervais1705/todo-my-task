import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Image, Row } from "react-bootstrap";
import { baseUrl } from "../../services/api";
import { toast } from "react-toastify";
import "./Todos.css";
import UpdateModal from "./UpdateTodo";
import { InfinitySpin } from "react-loader-spinner";
const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [show, setShow] = useState(false);
  const [refetch, setRefetch] = useState(0);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(baseUrl + "/products", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res?.data?.status) {
          setTodos(res?.data?.data);
          setLoading(false);
          if (res?.data?.data?.length === 0) {
            setAlert(true);
          }
        } else {
          toast.error(res.data.message);
        }
      });
  }, [refetch, token]);
  console.log(todos);

  const handleDelete = async (id) => {
    await axios
      .delete(baseUrl + `/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res?.data?.message);
          setRefetch(refetch + 1);
        } else {
          toast.success(res?.data?.message);
        }
      });
  };

  return (
    <div>
      <Container>
        {loading ? (
          <div className="mt-5">
            <InfinitySpin width="200" color="#000000" className="mt-5" />
          </div>
        ) : (
          <>
            {todos.length === 0 ? (
              <Alert
                variant="danger"
                onClose={() => setAlert(false)}
                className="mt-5"
              >
                <Alert.Heading>Sorry! You have no Todos yet!</Alert.Heading>
              </Alert>
            ) : (
              <>
                <h3 className="mt-5">Manage Todos</h3>
                <div className="mb-5">
                  <Row>
                    {todos?.map((todo) => (
                      <Col
                        key={todo?.id}
                        xs={12}
                        md={6}
                        lg={6}
                        xl={6}
                        className="g-5"
                      >
                        <div className="card-style">
                          <div className="p-2">
                            <div className="mb-3">
                              <h5 className="text-start">{todo?.name}</h5>
                              <p className="text-start">
                                <small>{todo?.desc}</small>
                              </p>
                              <p className="text-start">
                                <small>Date: {todo?.date}</small>
                              </p>
                            </div>
                            <div className="btn-div">
                              <button
                                onClick={() => {
                                  setSelectedId(todo._id);
                                  handleShow();
                                }}
                                className=" update-btn"
                              >
                                Update
                              </button>
                              <button
                                onClick={() => handleDelete(todo?._id)}
                                className=" delete-btn"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              </>
            )}
          </>
        )}
        {show && (
          <UpdateModal
            show={show}
            handleClose={handleClose}
            selectedId={selectedId}
            refetch={refetch}
            setRefetch={setRefetch}
          />
        )}
      </Container>
    </div>
  );
};

export default Todos;

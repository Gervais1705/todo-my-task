import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Header from "./Components/Commons/Header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Components/Authenication/Login/Login";
import Register from "./Components/Authenication/Register/Register";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "./services/api";
import MyProfile from "./Components/MyProfile/MyProfile";
import Todos from "./Components/Todos/Todos";
import AddTodos from "./Components/AddInventories/AddTodos";
export const UserContext = createContext();
function App() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      axios.post(`${baseUrl}/user/autoLogin`, { token: token }).then((res) => {
        if (res.data.status) {
          setUser(res.data.result);
        }
      });
    }
  }, [token]);
  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route
            path="/todos"
            element={<Todos></Todos>}
          ></Route>
          <Route
            path="/add-todos"
            element={<AddTodos></AddTodos>}
          ></Route>
          <Route path="/my-profile" element={<MyProfile></MyProfile>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
        </Routes>
      </UserContext.Provider>
      <ToastContainer />
    </div>
  );
}

export default App;

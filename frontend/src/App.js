import "./style/dark.scss";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import NewUser from "./pages/newUser/NewUser.jsx";
import EditUser from "../src/pages/editUser/EditUser.jsx";
import NewAdmin from "./pages/newAdmin/NewAdmin.jsx"
import EditAdmin from "./pages/editAdmin/EditAdmin.jsx"
import Servers from "./pages/servers/Servers.jsx";
import Thresholds from "./pages/Thresholds/Thresholds.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function App() {

  const { darkMode } = useContext(DarkModeContext);

  return (

    <div className={darkMode ? "app dark" : "app"}>

      <BrowserRouter>

        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />

          <Route path="/users" element={<List />} />
          <Route path="/users/new" element={<NewUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />

          <Route path="/admins" element={<List />} />
          <Route path="/admins/new" element={<NewAdmin />} />
          <Route path="/admins/edit/:id" element={<EditAdmin />} />

          <Route path="/servers" element={<Servers />} />

          <Route path="/thresholds" element={<Thresholds />} />

        </Routes>

      </BrowserRouter>

      <ToastContainer />

    </div>
  );
}

export default App;

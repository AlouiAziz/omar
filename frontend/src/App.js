import Home from "./pages/home/Home";
import Login from "./pages/Login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import NewUser from "./pages/newUser/NewUser.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { userColumns } from "./datatablesource";
import Edit from "../src/pages/editUser/Edit.jsx";
import Servers from "./pages/servers/Servers.jsx";
import Cercle from "./components/cercle/Cercle.jsx";


function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (

    <div className={darkMode ? "app dark" : "app"}>

      <BrowserRouter>

        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />

          <Route path="/users" element={<List columns={userColumns} />} />
          <Route path="/users/:id" element={<Single />} />
          <Route path="/users/new" element={<NewUser />} />
          <Route path="/users/edit/:id" element={<Edit />} />

          <Route path="/servers" element={<Servers />} />
          <Route path='/serverDetails' element={<Cercle />} />

        </Routes>

      </BrowserRouter>

      <ToastContainer />

    </div>
  );
}

export default App;

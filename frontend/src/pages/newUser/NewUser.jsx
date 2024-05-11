import "./newUser.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { userInputs } from "../../formSource";
import useFetch from '../../hooks/useFetch.js';

const NewUser = () => {

  const { data: admins, loading, error } = useFetch("/admins");
  const { data: servers, sloading, serror } = useFetch("/servers");

  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});

  const handleChange = e => {
    const { id, value } = e.target;
    setInfo(prevInfo => ({ ...prevInfo, [id]: value }));
  }

  const handleClick = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "SuccessStudy");

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dgma2l4hh/image/upload",
        formData
      );
      const { url } = uploadRes.data;
      const newUser = { ...info, img: url };

      await axios.post("/users", newUser);
      toast.success("User has been created");
      navigate("/users");
    } catch (err) {
      console.log(err);
      err.response.data.errors.forEach((error) => toast.error(error.msg));
    }
  };



  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New User</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              {userInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} onChange={handleChange} id={input.id} />
                </div>))}
              <div className="formInput">
                <label>Admin</label>
                <select id="admin"  onChange={handleChange}>
                  {admins &&
                    admins.map(admin => (
                      <option key={admin._id} value={admin._id}>
                        {admin?.nom} {admin?.prenom}
                      </option>
                    ))}
                </select>

              </div>

              {/* <div className="formInput">
                <label>Servers</label>
                  {admins &&
                    servers.map(server => (
                      <input type="checkbox" key={server?._id} id={server?._id} value={server?.serverName} />
                    ))}
              </div> */}

              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUser;










import "./newUser.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { userInputs } from "../../formSource";

const NewUser = () => {

  const navigate = useNavigate()

  const [file, setFile] = useState("");

  const [info, setInfo] = useState({})

  const handleChange = e => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async e => {

    e.preventDefault();
    if (!file) {
      toast.error('Please select a file');
      return;
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "SuccessStudy");

    try {
      const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dgma2l4hh/image/upload", data);
      const { url } = uploadRes.data;
      const newUser = { ...info, img: url };
      await axios.post('/auth/register', newUser);
      toast.success('User Has Been Created');
      navigate('/users');
    } catch (err) {
      err.response.data.errors.forEach(error => toast.error(error.msg));
    }
  }



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
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUser;

import "./newUser.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Inputs } from "../../formSource";
import useFetch from '../../hooks/useFetch.js';

const NewUser = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState({});
  const [currentAdmin, setCurrentAdmin] = useState("");
  const [privilege, setPrivilege] = useState([]);
  const [selectedPrivileges, setSelectedPrivileges] = useState([]);
  const [privilegeString, setPrivilegeString] = useState('');

  const { data: admins, loading: adminsLoading, error: adminsError } = useFetch("/admins");
  const { data: priv, loading: privLoading, error: privError } = useFetch(`/admins/${currentAdmin}`);

  useEffect(() => {
    if (priv && priv.privilege) {
      setPrivilege(priv.privilege.split(';'));
    } else {
      setPrivilege([]);
    }
  }, [priv]);

  useEffect(() => {
    setPrivilegeString(selectedPrivileges.join(';'));
  }, [selectedPrivileges]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInfo((prevInfo) => ({ ...prevInfo, [id]: value }));
  };

  const handleAdminChange = (e) => {
    setCurrentAdmin(e.target.value);
  };

  const handleServerChange = (e) => {
    const { value, checked } = e.target;
    setSelectedPrivileges((prevPrivileges) =>
      checked ? [...prevPrivileges, value] : prevPrivileges.filter((server) => server !== value)
    );
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      let imgUrl = "";

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "SuccessStudy");

        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dgma2l4hh/image/upload",
          formData
        );
        imgUrl = uploadRes.data.url;
      }

      const newUser = { ...info, img: imgUrl, admin: currentAdmin, privilege: privilegeString };

      await axios.post("/users", newUser);
      toast.success("User has been created");
      navigate("/users");
    } catch (err) {
      console.error(err);
      const errorMsgs = err.response?.data?.errors || [{ msg: "An error occurred" }];
      errorMsgs.forEach((error) => toast.error(error.msg));
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
            <label htmlFor="file">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
              />
            </label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
          </div>
          <div className="right">
            <form>
              {Inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                    id={input.id}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Admin</label>
                <select id="admin" onChange={handleAdminChange} value={currentAdmin}>
                  <option value="" disabled>Select Admin</option>
                  {admins && admins.map((admin) => (
                    <option key={admin._id} value={admin._id}>
                      {admin?.nom} {admin?.prenom}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{marginRight:250}}>Servers</label>
                {privilege.map((priv, index) => (
                  <div key={index} className="choosePrivilege">
                    <input
                      type="checkbox"
                      id={`priv-${index}`}
                      value={priv}
                      onChange={handleServerChange}
                    />
                    <label htmlFor={`priv-${index}`}>{priv}</label>
                  </div>
                ))}
              </div>
            </form>
            <button className="send" onClick={handleClick}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUser;

import "./editUser.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from '../../hooks/useFetch.js'


const EditUser = () => {

  const location = useLocation();
  const navigate = useNavigate();

  
  const id = location.pathname.split("/")[3];
  const { data, loading, error } = useFetch(`/users/${id}`);
  
  const { data: admins, loading: adminsLoading, error: adminsError } = useFetch("/admins");
  
  const [info, setInfo] = useState({});
  const [currentAdmin, setCurrentAdmin] = useState("");
  
  useEffect(() => {
    if (data) {
      setInfo(data);
      setCurrentAdmin(info?.admin?._id)
    }
  }, [data]);
  


  const handleAdminChange = (e) => {
    setCurrentAdmin(e.target.value);
  };

  const handleChange = e => {
    setInfo(prevInfo => ({ ...prevInfo, [e.target.id]: e.target.value  }));
  };

  const handleClick = async e => {
    e.preventDefault();
    try {

     const { admin, ...rest } = info
     const updates = {...rest , admin:currentAdmin}
      await axios.put(`/users/${id}`, updates);
      toast.success('User Has Been Updated');
      navigate('/users');
    } catch (error) {
      toast.error("error");
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Update User</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={info?.img}
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label>Email</label>
                <input value={info.email || ''} id="email" onChange={handleChange} />
              </div>

              <div className="formInput">
                <label>Nom</label>
                <input value={info.nom || ''} id="nom" onChange={handleChange} />
              </div>

              <div className="formInput">
                <label>Prénom</label>
                <input value={info.prenom || ''} id="prenom" onChange={handleChange} />
              </div>

              <div className="formInput">
                <label>Privilège</label>
                <input value={info.privilege || ''} id="privilege" onChange={handleChange} />
              </div>

              <div className="formInput">
                <label>Admin</label>
                <select id="admin" onChange={handleAdminChange} value={currentAdmin}>
                  {/* <option value={info?.admin?.id} disabled>  {info?.admin?.nom} {info?.admin?.prenom}</option> */}
                  {admins && admins.map((admin) => (
                    <option key={admin._id} value={admin._id}>
                      {admin?.nom} {admin?.prenom}
                    </option>
                  ))}
                </select>
              </div>

              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;

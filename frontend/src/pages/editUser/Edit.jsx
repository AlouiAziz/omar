import "./newUser.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from '../../hooks/useFetch.js'


const Edit = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const id = location.pathname.split("/")[3];
  const { data, loading, error } = useFetch(`/users/${id}`);

  const [info, setInfo] = useState({});

  useEffect(() => {
    if (data) {
      setInfo(data);
    }
  }, [data]);


  const handleChange = e => {
    setInfo(prevInfo => ({ ...prevInfo, [e.target.id]: e.target.value }));
  };

  const handleCheckboxChange = e => {
    const value = e.target.checked;
    setInfo(prevInfo => ({ ...prevInfo, [e.target.id]: value }));
  };

  const handleClick = async e => {
    e.preventDefault();
    try {
      await axios.put(`/users/${id}`, info);
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
              src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
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

              {/* <div className="formInput">
                <label>Password</label>
                <input type="password" id="password" onChange={handleChange} />
              </div> */}

              <div className="formInput" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div className="formInput" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <label>Admin</label>
                  <input
                    type="checkbox"
                    id="isAdmin"
                    checked={info.isAdmin}
                    onChange={handleCheckboxChange}
                  />
                </div>
                <div className="formInput" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <label>SuperAdmin</label>
                  <input
                    type="checkbox"
                    id="SuperAdmin"
                    checked={info.SuperAdmin}
                    onChange={handleCheckboxChange}
                  />
                </div>
              </div>


              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;

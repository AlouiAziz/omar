import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from '../../hooks/useFetch.js'


const EditAdmin = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const id = location.pathname.split("/")[3];
  console.log(id)
  const { data, loading, error } = useFetch(`/admins/${id}`);

  console.log(data)

  const [info, setInfo] = useState({});

  useEffect(() => {
    if (data) {
      setInfo(data);
    }
  }, [data]);


  const handleChange = e => {
    setInfo(prevInfo => ({ ...prevInfo, [e.target.id]: e.target.value }));
  };

  const handleClick = async e => {
    e.preventDefault();
    try {
      await axios.put(`/admins/${id}`, info);
      toast.success('User Has Been Updated');
      navigate('/admins');
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
          <h1>Update Admin</h1>
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
                <label>First Name</label>
                <input value={info.nom || ''} id="nom" onChange={handleChange} />
              </div>

              <div className="formInput">
                <label>Last Name</label>
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


              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAdmin;

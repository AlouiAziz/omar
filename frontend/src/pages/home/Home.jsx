import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Courbe from '../../components/courbe/Courbe.jsx'


const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Courbe />
        </div>
      </div>
    </div>
  );
};

export default Home;

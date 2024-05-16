import "./home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Statistics from '../../components/statistics/Statistics'


const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Statistics />
        </div>
      </div>
    </div>
  );
};

export default Home;

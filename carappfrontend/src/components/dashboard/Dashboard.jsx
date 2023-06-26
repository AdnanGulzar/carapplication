import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../header/Header";

const Dashboard = () => {
  // const navigate=useNavigate()
  // let token =localStorage.getItem("token");
  // console.log(token);
  // if(!token){
  //   navigate("/signup")

  // }
  return (
    <>
      <ResponsiveAppBar />
      <h1>Welcome to DASHBOARD</h1>
      <Outlet />
    </>
  );
};

export default Dashboard;

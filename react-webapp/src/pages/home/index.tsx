import { useEffect } from "react";
import api from "@/services";

const Home = () => {

  const fetchUsersList = async () => {
    await api
      .getUsers({})
      .then((res) => {
        console.log("----res---->", res);
      })
      .catch((err) => {
        console.log("-----err--->", err);
      });
  };

  
  useEffect(() => {
    fetchUsersList();
  }, []);



  return <div>首页</div>;
};

export default Home;

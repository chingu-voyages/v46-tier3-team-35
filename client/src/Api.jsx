import { useEffect } from "react";
import Axios from "axios";
function ApiFetch() {
  useEffect(() => {
    Axios.get(`https://api.coinstats.app/public/v1/coins?skip=0&limit=100¤cy=INR`).then((res) => {
      console.log(res);
    });
  }, []);

  return <div></div>;
}

export default ApiFetch;

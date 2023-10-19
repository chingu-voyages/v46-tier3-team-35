import { useEffect } from "react";
import Axios from "axios";
function ApiFetch() {
  useEffect(() => {
    Axios
      .get(
        "https://api.coingecko.com/api/v3/search/trending"
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);
  

  return <div></div>;
}

export default ApiFetch;


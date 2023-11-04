import { useEffect } from "react";
function ApiFetch() {
  useEffect(() => {
        fetch('https://api.coingecko.com/api/v3/search/trending')
        .then(response => response.json())
        .then(data => console.log(data.coins))
        .catch(error => console.error(error));
    },[])
  

  return <div></div>;
}

export default ApiFetch;


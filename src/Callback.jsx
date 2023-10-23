import { useEffect } from "react";

export const Callback = (props) => {
  useEffect(() => {
    if (/access_token|id_token|error/.test(props.loc.hash)) {
      props.auth.handleAuthentication();
    }
  }, []);

  return <h1>Loading...</h1>;
};

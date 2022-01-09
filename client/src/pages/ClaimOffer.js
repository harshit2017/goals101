import React, { useContext, } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function ClaimOffer() {
  const { authState } = useContext(AuthContext);

  let history = useHistory();

  const clickClose = () => {
    history.push(`/${authState.username}/alloffers`);
  };

  return (
    <div>
      <button onClick={clickClose}>Close</button>
      <h1>Offer Claimed Successfully !</h1>
      </div>
  );
}

export default ClaimOffer;

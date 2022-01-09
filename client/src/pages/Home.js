import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Home() {
  const [listOfCoupons, setListOfCoupons] = useState([]);
  const { authState } = useContext(AuthContext);
  let history = useHistory();

  console.log(authState, "harshit")

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    } else {
      axios
        .get("http://localhost:3001/coupons", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListOfCoupons(response.data.listOfCoupons);
        });
    }
  }, []);



  const clickLearnMore = (id) => {
    history.push(`/${authState.username}/coupon/${id}`)
  };

  const clickClaimOffer = (id) => {
    const username = authState.username;
    const offer = { id, username };
    axios
      .post(`http://localhost:3001/offer/`, offer, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        console.log(response, 'successful');
        history.push(`/${authState.username}/claimoffer/${id}`);
      }).catch((error) => console.log(error.response.data));

  };

  return (
    <div>
      {listOfCoupons.map((coupon, idx) => {
        return <div key={idx} className="content">
          <img src={coupon.imageUrl} alt='coupon' />
          <li>{coupon.title.toUpperCase()}</li>
          <li>{coupon.summary}</li>
          <button onClick={() => clickLearnMore(coupon.id)}>Learn More</button>
          <button onClick={() => clickClaimOffer(coupon.id)}>Claim Offer !</button>
        </div >
      })}

    </div >
  );
}

export default Home;

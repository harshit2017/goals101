import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Coupon() {
  let { id } = useParams();
  const [coupon, setCoupon] = useState(null);
  const { authState } = useContext(AuthContext);


  let history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    } else {
      axios
        .get(`http://localhost:3001/coupons/byId/${id}`, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          console.log(response)
          setCoupon(response.data);
        });
    }
  }, []);

  const clickClose = (id) => {
    setCoupon(null);
    history.push(`/${authState.username}/alloffers`);
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
        setCoupon(null);
        history.push(`/${authState.username}/claimoffer/${id}`);
      }).catch((error) => console.log(error.response.data));

  };


  return (
    <>
      {!coupon ? <></> : <div className="coupon">
        <img src={coupon.imageUrl} alt='coupon' />
        <h2>{coupon.title.toUpperCase()}</h2>
        <p>{coupon.couponText}</p>
        <button onClick={clickClose}>Close</button>
        <button onClick={() => clickClaimOffer(coupon.id)}>Claim Offer !</button>
      </div>}
    </>
  )
}

export default Coupon;

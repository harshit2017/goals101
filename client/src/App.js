import { Route, Switch, Link, useHistory } from "react-router-dom";
import Home from "./pages/Home";
import ClaimOffer from "./pages/ClaimOffer";
import Coupon from "./pages/Coupon";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  let history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const clickLogout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
    history.push('/login')
  };


  return (
    <div >
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <div>
          {!authState.status ? (
            <>
              <Link to="/login"> Login</Link>
              <Link to="/registration"> Registration</Link>

            </>
          ) : (
            <>
              <button onClick={clickLogout}> Logout</button>
            </>
          )}
        </div>
        <Switch>
          <Route path="/registration" exact component={Registration} />
          <Route path="/login" exact component={Login} />
          <Route path="/:username/alloffers" > <Home /></Route>
          <Route path="/:username/claimoffer" > <ClaimOffer />   </Route>
          <Route path="/:username/coupon/:id" exact> <Coupon /></Route>
        </Switch>
      </AuthContext.Provider>
    </div >
  );
}

export default App;

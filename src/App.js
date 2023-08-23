/** @format */

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import Post from "./components/Post";
import Registration from "./components/Registration";
import Login from "./components/Login";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import PageNotFound from "./components/PageNotFound";
import Profile from "./components/Profile";
import ChangePassword from "./components/ChangePassword";
import Nav from "./components/Nav";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    role:'',
    status: false,
    
    });

  console.log(authState);

  useEffect(() => {
    axios
      .get("http://localhost:3002/auth/auth", {
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
            role: response.data.role,
            status: true
           
          });
        }
        console.log("provera autentifikacije zavrsena");
      })
      .catch((err) => {
        console.log("greska pri proveri autentifikacije", err);
      });
  }, []);

  //logout funkcija, prebacena u Nav.js
 /*  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      role: '',
      status: false,
    });
  }; */

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>
        <Nav setAuthState={setAuthState} />        
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/createpost' exact component={CreatePost} />
          <Route path='/post/:id' exact component={Post} />
          <Route path='/registration' exact component={Registration} />
          <Route path='/login' exact component={Login} />
          <Route path='/profile/:id' exact component={Profile} />
          <Route path='/changepassword' exact component={ChangePassword} />
          <Route path='*' exact component={PageNotFound} />
        </Switch>
        
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

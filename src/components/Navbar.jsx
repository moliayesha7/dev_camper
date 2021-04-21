import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";
import { logout } from "../actions/auth";
import Dashboard from "./Dashboard";
import { MdComputer } from "react-icons/md";
const Navbar = () => {


  const [showUserBoard, setShowshowUserBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [role,setRole]= useState("");
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logout());
  };


  useEffect(() => {

    const url = "http://115.127.8.84:8080/api/v1/auth/me";
    if(currentUser)
    fetch(url, {
      method: "GET",
      "Token":currentUser.token
    })
      .then((response) => response.json())
      .then((data) => {
      
        setRole(data.data.role);

        if(role==="publisher"){
          setShowAdminBoard(true)
        }else if(role==="user"){
          setShowshowUserBoard(true)
        }else{}
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);


  return (
    <nav className="navbar navbar-expand">
      {currentUser ? (
        <Link to={"/dashboard"} className="navbar-brand">
          <MdComputer className="mr-2" />DevCamper
        </Link>
      ) : <Link to={"/#"} className="navbar-brand">
        <MdComputer className="mr-2" />DevCamper
          </Link>}
      <div className="navbar-nav mr-auto">
        {showAdminBoard && (
          <li className="nav-item">
            <Link to={"/admin"} className="nav-link">
              Publisher
                </Link>
          </li>
        )}

        {currentUser && (
          <li className="nav-item">
            <Link to={"/user"} className="nav-link">
              user
            </Link>
          </li>
        )}
      </div>

      {currentUser ? (
        <div className="navbar-nav ml-auto">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Bootcamp
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="/singleBootcamp" >Single Bootcamp</a>
              <a className="dropdown-item" href="/addBootcamp" >Add Bootcamp</a>
            </div>

          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Courses
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="/addCourse">Add Course</a>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Acount
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="/login" onClick={logOut}>Logout</a>
            </div>
          </li>
        </div>

      ) : (
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={"/login"} className="nav-link">
              Login
                </Link>
          </li>

          <li className="nav-item">
            <Link to={"/register"} className="nav-link">
              Register
                </Link>
          </li>
        </div>
      )}
      <div className="navbar-nav">
        <li className="nav-item">
          <Link to={"/#"} className="nav-link">
            | Browse Brootcamps
               </Link>
        </li>
      </div>
    </nav>
  );
};

export default Navbar;
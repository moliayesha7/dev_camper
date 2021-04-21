import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserPlus } from "react-icons/fa";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";


import { register } from "../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vname = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [selectedRole, setSelectedRole] = useState("regularUser");
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const handleChange = (event) => {
    const selectedRole = event.target.value;
    setSelectedRole(selectedRole);
    console.log(selectedRole);
};
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const onChangeConfirmPassword = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
  };
  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(name, email, password, selectedRole))
        .then(() => {
          setSuccessful(true);
          props.history.push("/login");
          window.location.reload();
        
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  return (
    <div className="col-md-12">
      <div className="card-reg  w-50">
     
      <h5 className="card-title"><FaUserPlus className="mr-2"/>Register</h5>
      <p className="card-text">Register to list your bootcamp or rate,reviews and favorite bootcamps</p>

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Enter full name"
                  value={name}
                  onChange={onChangeName}
                  validations={[required, vname]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Input
                  type="confirmPassword"
                  className="form-control"
                  placeholder="Confirm password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={onChangeConfirmPassword}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
              <label htmlFor="password">User Role</label>
              <div className="form-check">
                <input 
                className="form-check-input" 
                type="radio" 
                name="selectedRole" 
                key="user"
                value="user"
                checked={selectedRole==="user"}
                onChange={handleChange}
                id="user" 
                />
                <label className="form-check-label" for="user">
                  Regular User (Browse,Write Reviews, etc)
                </label>
              </div>
              <div className="form-check">
                <input 
                className="form-check-input" 
                type="radio" 
                name="selectedRole"
                key="publisher"
                value="publisher"
                checked={selectedRole==="publisher"}
                onChange={handleChange} 
                id="publisher" 
                />
                <label className="form-check-label" for="publisher">
                  Brootcamp/Publisher
                </label>
              </div>
              </div>

              <p className="text-danger"> * You must be affiliated with the bootcamp in some way in order to add it to DevCamper</p>


              <div className="form-group red-color">
                <button className="btn btn-block text-white">Register</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>


    </div>
  );
};

export default Register;

import React, { useState, useRef, useReducer } from "react";
import {  useSelector } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Redirect } from 'react-router-dom';
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";

const Checkbox = ({ fnClick, fnChange, title = "", checked = false }) => (
  <label>
    <input
      onClick={e => {
        if (fnClick !== undefined) fnClick(e.target.checked);
      }}
      onChange={e => {
        if (fnChange !== undefined) fnChange(e.target.checked);
      }}
      type="checkbox"
      checked={checked}
    />
    {title}
  </label>
);

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};


const AddCourse = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [title, setTitle] = useState("");
  const [weeks, setWeeks] = useState("");
  const [tuition, setTuition] = useState("");
  const [scholarhipsAvailable, setScholarhipsAvailable] = useState("");
  const [description, setDescription] = useState("");
  const { user: currentUser } = useSelector((state) => state.auth);
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector(state => state.message);
  const [addSkillType, setAddSkillType] = useState(["Beginner (Any)", "Mid Level", "Top"]);
  const Add = addSkillType.map(Add => Add)

  const [minimumSkill, setMinimumSkill] = useState('Beginner (Any)');
  //checkbox 
  const initialState = {
    click: false,
    change: false
  };
  const reducer = (state, action) => ({ ...state, ...action });
  const [state, setState] = useReducer(reducer, initialState);


  const local_location = props.location.pathname;
  const id = local_location.split('/')[2];

  const onChangeTitle = (e) => {
    const title = e.target.value;
    setTitle(title);
  };

  const handleAddSkillTypeChange = (e) => {
    console.clear();
    console.log((addSkillType[e.target.value]));
    setMinimumSkill(addSkillType[e.target.value])
  }

  const onChangeDescription = (e) => {
    const description = e.target.value;
    setDescription(description);
  };

  const onChangeWeeks = (e) => {
    const weeks = e.target.value;
    setWeeks(weeks);
  };
  const onChangeTuition = (e) => {
    const tuition = e.target.value;
    setTuition(tuition);
  };

  const url = `http://115.127.8.84:8080/api/v1/bootcamps/${id}/courses`;
  const handleSubmit = (event) => {
    event.preventDefault();
    const confirmData = {
      "title": title,
      "description": description,
      "weeks": weeks,
      "tuition": tuition,
      "minimumSkill": minimumSkill,
      "scholarhipsAvailable": state.click
    };
    console.log(confirmData);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Token": currentUser.token,
      },
      body: JSON.stringify(confirmData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

      })
      .catch((error) => {
        console.error("Error:", error);
      });

  };


  return (
    (currentUser === null ?
      <Redirect to="/login" /> :
      <div className="col-md-12 addCourse">
        <div className="card-reg  w-50">
          <a href="#" className="previous text-black">&laquo; Manage Courses</a>
          <h2 className="card-title">DevWorks Bootcamp</h2>
          <h5 className="text-danger">Add Course</h5>
          {/* {currentUser.token} */}
          <Form ref={form}>

            <div>
              <div className="form-group">
                <label htmlFor="name">Course Title</label>
                <Input
                  type="text"
                  className="form-control"
                  name="title"
                  placeholder="Title"
                  value={title}
                  onChange={onChangeTitle}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="weeks">Duration</label>
                <Input
                  type="text"
                  className="form-control"
                  name="weeks"
                  placeholder="Duration"
                  value={weeks}
                  onChange={onChangeWeeks}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="tuition">Course Tuition</label>
                <Input
                  type="tuition"
                  className="form-control"
                  placeholder="Tuition"
                  name="tuition"
                  value={tuition}
                  onChange={onChangeTuition}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label for="minimumSkill">Minimum Skill Required</label>
                <select
                  onChange={e => handleAddSkillTypeChange(e)}
                  className="browser-default custom-select">
                  {
                    Add.map((address, key) => <option key={key} value={key}>{address}
                    </option>)
                  }
                </select>
              </div>

              <div className="form-group">
                <textarea id="description"
                  name="description"
                  rows="4"
                  cols="50"
                  onChange={onChangeDescription}
                  placeholder="Course Description Summery"
                  style={{ width: "100%" }}>
                </textarea>
                <p>No more then 500 charecters</p>
              </div>

              <div className="form-group">
                <Checkbox
                  title="Scholarship Available"
                  fnClick={v => setState({ click: v })}
                  checked={state.click}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-dark btn-block" onClick={handleSubmit}>Add Course</button>
              </div>
            </div>

            {message && (
              <div className="form-group">
                <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
      </div>
    ));
};

export default AddCourse;

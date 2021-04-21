import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import Pagination from 'reactjs-hooks-pagination';
const pageLimit = 5;
const Bootcamps = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [bootcamps, setBootcamps] = useState([]);
  const [bootcampId, setBootcampId] = useState("");
  const [totalRecords, setTotalRecords] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {

    const url = "http://115.127.8.84:8080/api/v1/bootcamps?page=" + currentPage + "&limit=5";
    fetch(url, {
      method: "GET"
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data.id);
        setBootcamps(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [currentPage]);



  const renderBootcampData = (bootcamp, index) => {

    return (
      <div className="card-b" id={bootcamp.id}>

        <div className="card-horizontal" >
          <div className="img-square-wrapper">
            <img className="" src="http://via.placeholder.com/300x180" alt="Card image cap" />
          </div>
          <div className="card-body">
            <button className="badge badge-success pull-left">8.8</button>
            <h4 className="card-title">{bootcamp.name}</h4>
            <p className="btn btn-dark">
              Boston,MA
            </p>

            <p>{bootcamp.courses.map((course, index) => {
              return (
                renderCourses(course, index)
              );
            })}</p>


          </div>
        </div>
      </div>
    )
  }


  const renderCourses = (course, index) => {
    return (
      <span className="card-text font-weight-bold" id={index}>{course.title},</span>
    )
  }

  return (
    (currentUser === null ?
      <Redirect to="/login" /> :
      <div className="row bootcamps">

        <div className="col-4">

          <div className="card-c">

            <h5 className="card-title">By Location</h5>
            <form>
              <div className="row">
                <div className="col">
                  <input type="text" className="form-control" placeholder="Miles From" />
                </div>
                <div className="col">
                  <input type="text" className="form-control" placeholder="Enter Zipcode" />
                </div>
              </div>
              <button className="btn-custom btn-block mt-2">
                Find Bootcamps
              </button>
            </form>

          </div>
          <h3>Filter</h3>
          <div className="form-group">

            <h6 for="rating">Rating</h6>
            <select className="custom-select" id="inputGroupSelect01">
              <option value="1">Any</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="form-group">

            <label for="budget">Budget</label>
            <select className="custom-select" id="inputGroupSelect01">
              <option value="1">Any</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>

            <button className="btn-custom btn-block mt-2">
              Find Bootcamps
            </button>
          </div>
        </div>

        <div className="col-8">


          {bootcamps.map((bootcamp, index) => {
            return (

              renderBootcampData(bootcamp, index)


            );
          })}

          <div className="justify-content-center">
            <Pagination
              totalRecords={totalRecords}
              pageLimit={pageLimit}
              pageRangeDisplayed={1}
              onChangePage={setCurrentPage}
            />
          </div>
        </div>

      </div>
    ))

};

export default Bootcamps;
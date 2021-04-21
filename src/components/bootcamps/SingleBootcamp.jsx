import React, { useEffect, useState } from 'react';
import {
  faCheck,
  faTimes,
  faComments,
  faGlobe,
  faPen,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
const SingleBootcamp = (props) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [housing, setHousing] = useState(false);
  const [jobAssistance, setJobAssistance] = useState(false);
  const [jobGuarantee, setJobGuarantee] = useState(false);
  const [selected, setSelected] = useState(false);
  const [careers, setCareers] = useState([]);
  const [averageCost, setAverageCost] = useState('');
  const [photo, setPhoto] = useState('');
  const [acceptGi, setAcceptGi] = useState(false);

  const local_location = props.location.pathname;
  const id = local_location.split('/')[2];

  useEffect(() => {

    const url = `http://115.127.8.84:8080/api/v1/bootcamps/${id}`;
   
    fetch(url, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setName(data.data.name);
        setDescription(data.data.description);
        setAverageCost(data.data.averageCost);
        setPhoto(data.data.photo);
        setHousing(data.data.housing);
        setJobAssistance(data.data.jobAssistance);
        setJobGuarantee(data.data.jobGuarantee);
        setAcceptGi(data.data.acceptGi);
        setCareers(data.data.careers);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [jobAssistance, jobGuarantee, acceptGi, housing, id]);

  const renderHousing = () => {
    if (housing) {
      return (
        <li className='list-group-item'>
          {' '}
          <FontAwesomeIcon icon={faTimes} className='text-danger mr-2' />{' '}
          Housing
        </li>
      );
    } else {
      return (
        <li className='list-group-item'>
          {' '}
          <FontAwesomeIcon icon={faCheck} className='text-success mr-2' />{' '}
          Housing
        </li>
      );
    }
  };

  const renderJobAssistance = () => {
    if (jobAssistance === false) {
      return (
        <li className='list-group-item'>
          {' '}
          <FontAwesomeIcon icon={faTimes} className='text-danger mr-2' /> Job
          Assistance
        </li>
      );
    } else {
      return (
        <li className='list-group-item'>
          {' '}
          <FontAwesomeIcon icon={faCheck} className='text-success mr-2' /> Job
          Assistance
        </li>
      );
    }
  };

  const renderJobGuarantee = () => {
    if (jobGuarantee === false) {
      return (
        <li className='list-group-item'>
          {' '}
          <FontAwesomeIcon icon={faTimes} className='text-danger mr-2' /> Job
          Guarantee
        </li>
      );
    } else {
      return (
        <li className='list-group-item'>
          {' '}
          <FontAwesomeIcon icon={faCheck} className='text-success mr-2' /> Job
          Guarantee
        </li>
      );
    }
  };

  const renderAcceptsGIBill = () => {
    if (acceptGi === false) {
      return (
        <li className='list-group-item'>
          {' '}
          <FontAwesomeIcon icon={faTimes} className='text-danger mr-2' />{' '}
          Accepts GI Bill
        </li>
      );
    } else {
      return (
        <li className='list-group-item'>
          {' '}
          <FontAwesomeIcon icon={faCheck} className='text-success mr-2' />{' '}
          Accepts GI Bill
        </li>
      );
    }
  };

  const renderCareersList = (career, index) => {
    return (
      <div className='card-d' id={index}>
        <h5 className='card-header-a'>{career}</h5>
        <div className='card-body'>
          <h3 className='card-text'>Duration : 12 weeks</h3>
          <p>
            In This course you will learn full stack web development,first
            learning all about the frontend with HTML/CSS?JS?Vue and then the
            backend with Node js?Express/MongoDB{' '}
          </p>
          <span>
            <i className='fa fa-spinner fa-spin'>no spinner but why</i>
          </span>
          <div className='card-e'>
            <ul className='list-group list-group-flush'>
              <li className='list-group-item'>Cost : $10.000 USD</li>
              <li className='list-group-item'>Skill Required Intermediate</li>
              <li className='list-group-item'>
                Scholarship Available{' '}
                <FontAwesomeIcon icon={faTimes} className='text-danger' />
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return currentUser === null ? (
    <Redirect to='/login' />
  ) : (
    <div className='row singleBootcamp'>
      <div className='col-8'>
        <h1>{name}</h1>
        <p>{description}</p>
        <h3>
          Avarage Course Cost :
          <span className='text-danger'>${averageCost}</span>
        </h3>
        {careers.map((career, index) => {
          return renderCareersList(career, index);
        })}
      </div>
      <div className='col-4 custom'>
        <div className='card-b d-flex align-items-start flex-column'>
          <img
            className='card-img-top'
            src='http://via.placeholder.com/300x180'
            alt='Card image cap'
          />
          <div className='custom-body-b'>
            <h3 className='text-center pt-4 pb-4'>
              <span class='badge-success round round-lg'>8.8</span>{' '}
              <span>Rating</span>
            </h3>
            <div className='card-f custom-body-b'>
              <ul className='list-group list-group-flush text-center '>
                <li className='list-group-item text-white bg-dark '>
                  {' '}
                  <FontAwesomeIcon
                    icon={faComments}
                    className='mr-2 text-white'
                  />
                  Read Reviews
                </li>
                <li className='list-group-item'>
                  <FontAwesomeIcon icon={faPen} className='mr-2 text-black' />{' '}
                  Write a Review
                </li>
                <li className='list-group-item text-white bg-secondary'>
                  {' '}
                  <FontAwesomeIcon
                    icon={faGlobe}
                    className='mr-2 text-white'
                  />{' '}
                  Visit Website
                </li>
              </ul>
            </div>
          </div>

          <div className='card-f d-flex align-items-end flex-column'>
            <ul className='list-group list-group-flush custom-body-a'>
              {renderHousing()}
              {renderJobAssistance()}
              {renderJobGuarantee()}
              {renderAcceptsGIBill()}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBootcamp;

import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";



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


const AddBootcamp = () => {
  const form = useRef();
  const checkBtn = useRef();
  const [selectedList, setSelectedList] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [checked, setChecked] = useState(false);
  const [housing, setHousing] = useState(false);
  const [jobAssistance, setJobAssistance] = useState(false);
  const [jobGuarantee, setJobGuarantee] = useState(false);
  const [selected, setSelected] = useState(false);
  const [careers, setCareers] = useState("");
  const [acceptGi, setAcceptGi] = useState(false);


  const handleChangeHousing = (event) => {
    setHousing(event.target.checked);
  }
  const handleChangeJobAssistance = (event) => {
    setJobAssistance(event.target.checked);
  }
  const handleChangeJobGuarantee = (event) => {
    setJobGuarantee(event.target.checked);
  }
  const handleChangeAcceptGi = (event) => {
    setAcceptGi(event.target.checked);
  }
  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  }
  const { message } = useSelector(state => state.message);


  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };


  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };


  const onChangeWebsite = (e) => {
    const website = e.target.value;
    setWebsite(website);
  };

  const onChangePhone = (e) => {
    const phone = e.target.value;
    setPhone(phone);
  };

  const onChangeAddress = (e) => {
    const address = e.target.value;
    setAddress(address);
  };
  const handleChange = e => {
    let { options } = e.target;
    options = Array.apply(null, options)
    const selectedValues = options.filter(x => x.selected).map(x => x.value);
    setSelectedList(selectedValues);
  }



  const handleSubmit = (event) => {
    event.preventDefault();

    const url = "http://115.127.8.84:8080/api/v1/bootcamps"
    const confirmData = {
      name: name,
      description: description,
      website: website,
      phone: phone,
      email: email,
      address: address,
      careers: selectedList,
      housing: housing,
      jobAssistance: jobAssistance,
      jobGuarantee: jobGuarantee,
      acceptGi: acceptGi

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
      <div className="col-md-12 addBootcamp">
    
        <div className="w-80">
          <h5 className="card-title">Add Bootcamp</h5>
          <p className="card-text">Important : You must be affiliated with a bootcamp to add to DevCamper</p>
          <Form ref={form}>
            <div className="row">
              <div className="col-sm-6">

                <div className="card-reg">
                  <div className="card-body">
                    <h5 className="card-title">Location & Contact</h5>
                    <p className="card-text">If multiple locatio use the main or largest</p>
                   

                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Bootcamp name"
                        value={name}
                        onChange={onChangeName}
                        validations={[required, vname]}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="address">Address</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="address"
                        placeholder="Full Address"
                        value={address}
                        onChange={onChangeAddress}
                        validations={[required]}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="phone"
                        placeholder="phone"
                        value={phone}
                        onChange={onChangePhone}
                        validations={[required]}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="email"
                        placeholder="Contact email"
                        value={email}
                        onChange={onChangeEmail}
                        validations={[required, validEmail]}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="website">Website</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="website"
                        placeholder="Website URL"
                        value={website}
                        onChange={onChangeWebsite}
                        validations={[required]}
                      />
                    </div>
                
                  </div>
                </div>

              </div>
              <div className="col-sm-6">
                <div className="card-reg">
                  <div className="card-body">
                    <h5 className="card-title">Other Info</h5>

                    <div className="form-group">
                      <label htmlFor="description">Description</label>
                      <textarea
                        value={description}
                        id="description"
                        name="description"
                        rows="4"
                        cols="50"
                        onChange={handleChangeDescription}
                        placeholder="Description (What you offer,etc)">
                      </textarea>
                      <p>no more then 500 charecters</p>
                    </div>

                    <div className="form-group">
                      <label for="careers">Careers</label>
                      <select
                        multiple
                        name="careers"
                        id="careers"
                        onChange={handleChange}

                        fullWidth

                      >
                        <option>Select all that apply</option>
                        <option value="web" id="careers" name="web">Web Development</option>
                        <option value="mobile" id="careers" name="mobile">Mobile Development</option>
                        <option value="ui" id="careers" name="ui">UI/UX</option>
                        <option value="front" id="careers" name="front">Front end</option>
                        <option value="backend" id="careers" name="backend">Backend end</option>

                      </select>

                    </div>


                    <div className="form-group">

                      <div className="form-check">
                        <label className="form-check-label">
                          <input type="checkbox" className="form-check-input" value="housing" name="housing" onClick={handleChangeHousing} />Housing
                    </label>
                      </div>
                      <div className="form-check">
                        <label className="form-check-label">
                          <input type="checkbox" className="form-check-input" value="jobAssistance" name="jobAssistance" onClick={handleChangeJobAssistance} />Job Assistance
                    </label>
                      </div>
                      <div className="form-check">
                        <label className="form-check-label">
                          <input type="checkbox" className="form-check-input" value="jobGuarantee" name="jobGuarantee" onClick={handleChangeJobGuarantee} />Job Guarantee
                    </label>
                      </div>
                      <div className="form-check">
                        <label className="form-check-label">
                          <input type="checkbox" className="form-check-input" value="acceptGi" name="acceptGi" onClick={handleChangeAcceptGi} />Accept GI Bill
                    </label>
                      </div>

                    </div>
                    <p className="text-danger">* After you add the bootcamp, you can add the specific courses offered</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group mt-4">
              <button className="btn btn-success btn-block" disabled={loading} onClick={handleSubmit}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Add Bootcamp</span>
              </button>
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

export default AddBootcamp;

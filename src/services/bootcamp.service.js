import axios from "axios";

const API_URL = "http://115.127.8.84:8080/api/v1/bootcamps";


const addBootcamp = (name,
  description,
  website,
  phone,
  email,
  address,
  careers,
  housing,
  jobAssistance,
  jobGuarantee,
  acceptGi) => {
  return axios
    .post(API_URL , {
  name,
  description,
  website,
  phone,
  email,
  address,
  careers,
  housing,
  jobAssistance,
  jobGuarantee,
  acceptGi
    })
    .then((response) => {
      console.log(response);
      return response.data;
    });
};



export default {
  addBootcamp
};

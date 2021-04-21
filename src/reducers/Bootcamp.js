import {
  ADD_BOOTCAMP_SUCCESS,
  ADD_BOOTCAMP_FAILED

} from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  name=null,
  description=null,
  website=null,
  phone=null,
  email=null,
  address=null,
  careers=null,
  housing=null,
  jobAssistance=null,
  jobGuarantee=null,
  acceptGi=null
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_BOOTCAMP_SUCCESS:
      return {
        ...state
    
        // user: payload.user,
      };
    case ADD_BOOTCAMP_FAIL:
      return {
        ...state
        
      };
    default:
      return state;
  }
}

import axios from 'axios';
import {showToast} from '../utils/ShowToast/ShowToast';

export const SignUpApi = async (data, genderValue, showToast, setSuccess) => {
  let {email, fullName, password, phone} = data;

  try {
    let res = await axios.post('https://rido-api.onrender.com/rider_signup', {
      name: fullName,
      email,
      gender: genderValue,
      password,
      phone_number: phone,
    });

    showToast(res);
    setSuccess(true);
  } catch (error) {
    showToast(error?.response);
  }
};

export const LoginApi = async (data) => {
  let {email, password} = data;

  try {
    let res = await axios.post('https://rido-api.onrender.com/rider_login', {
      email,
      password,
    });

    showToast(res);

    return res?.data;
  } catch (error) {
    showToast(error?.response);
  }
};

export const RequestRide = async (
  riderID,
  pickup_la,
  pickup_lo,
  dropoff_la,
  dropoff_lo,
  state,
  setVisible,
) => {
  try {
    let res = await axios({
      method: 'POST',
      url: 'https://rido-api.onrender.com/request_ride',
      data: {
        rider_id: parseInt(riderID),
        pickup_lat: eval(pickup_la),
        pickup_lon: eval(pickup_lo),
        dropoff_lat: eval(dropoff_la),
        dropoff_lon: eval(dropoff_lo),
      },
      headers: {
        Authorization: `Bearer ${state?.user?.user?.token}`,
      },
    });

    return res;
  } catch (error) {
    showToast(error?.response);
    setVisible(false);
  }
};

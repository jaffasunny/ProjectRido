import axios from 'axios';
import {showToast} from '../utils/ShowToast/ShowToast';

export const RidePreview = async (origin, destination, user) => {
  const headers = {Authorization: `Bearer ${user?.user?.token}`};

  try {
    let res = await axios.get(
      `https://rido-api.onrender.com/ride_preview?pickup_lat=${origin?.latitude}&pickup_lon=${origin?.longitude}&dropoff_lat=${destination?.latitude}&dropoff_lon=${destination?.longitude}`,
      {headers},
    );

    // return res;
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

export const GetDrivers = async user => {
  const headers = {Authorization: `Bearer ${user?.user?.user?.token}`};

  try {
    let res = await axios.get(
      `https://rido-api.onrender.com/retrieve_drivers?rider_id=${user?.user?.user?.rider_id}`,
      {headers},
    );

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const GetRideDetails = async (user, _id) => {
  const headers = {Authorization: `Bearer ${user?.user?.user?.token}`};

  try {
    let res = await axios.get(
      `https://rido-api.onrender.com/ride_detail_data?id=${_id}`,
      {headers},
    );

    return res;
  } catch (error) {
    console.log('API ERROR response', error?.response);
    setVisible(false);
  }
};

import axios from 'axios';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const showToast = response => {
  if (response?.status !== 400) {
    Toast.show({
      type: 'success',
      text1: `${!response?.token ? 'Signup' : 'Login'} Successful`,
    });
  } else {
    Toast.show({
      type: 'error',
      text1: response?.data?.detail,
    });
  }
};

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

    showToast(res?.response);
    setSuccess(true);
  } catch (error) {
    showToast(error?.response);
  }
};

export const LoginApi = async (data, navigation) => {
  let {email, password} = data;

  try {
    let res = await axios.post('https://rido-api.onrender.com/rider_login', {
      email,
      password,
    });

    showToast({token: res?.data?.token});
    navigation.navigate('drawerScreens');

    return res?.data?.token;
  } catch (error) {
    showToast(error?.response);
  }
};

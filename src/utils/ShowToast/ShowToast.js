import Toast from 'react-native-toast-message';

export const showToast = response => {
  if (response.msg) {
    Toast.show({
      type: 'error',
      text1: `${response.msg}`,
    });
  } else {
    if (response?.status === 200) {
      Toast.show({
        type: 'success',
        text1: `${!response?.data.token ? 'Signup' : 'Login'} Successful`,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: response?.data?.detail,
      });
    }
  }
};

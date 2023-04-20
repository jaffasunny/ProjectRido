import * as Yup from 'yup';

export const loginValidation = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('No password provided')
      .min(8, 'Password is too short - should be 8 chars minimum')
      .matches(/[a-zA-Z]/, 'Password can only contain Latin letters'),
  });

  return validationSchema;
};

export const signUpValidation = () => {
  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required('Name is required')
      .min(3, 'Name should be 3 characters minimum'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    gender: Yup.string().required('Please select a gender'),
    password: Yup.string()
      .required('No password provided')
      .min(8, 'Password is too short - should be 8 chars minimum')
      .matches(/^[a-zA-Z0-9]+$/, 'Password can only contain Latin letters'),
    repassword: Yup.string()
      .required('No password provided')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    permission: Yup.bool().oneOf([true], 'This checkbox is required.'),
  });

  return validationSchema;
};

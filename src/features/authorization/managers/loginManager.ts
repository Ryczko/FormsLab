import { FormikHelpers } from 'formik';
import { logInWithEmailAndPassword } from 'src/firebase';
import * as Yup from 'yup';

export const useLoginManager = () => {
  const initialValues = {
    email: '',
    password: '',
    message: '',
  };

  type FormValues = typeof initialValues;

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Incorrect email address')
      .required('Required field'),
    password: Yup.string()
      .matches(
        /^[a-zA-Z0-9!@#$%^&*()_+]{8,50}$/,
        'The password must contain at least 8 characters.'
      )
      .required('Required field'),
  });

  const onSubmit = async (
    values: FormValues,
    { resetForm, setFieldError }: FormikHelpers<FormValues>
  ) => {
    try {
      await logInWithEmailAndPassword({
        email: values.email,
        password: values.password,
      });
      resetForm();
    } catch (e) {
      setFieldError('message', 'Error while signing in!');
    }
  };

  return {
    initialValues,
    LoginSchema,
    onSubmit,
  };
};

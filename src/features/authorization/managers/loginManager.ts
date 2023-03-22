import { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { logInWithEmailAndPassword } from 'firebaseConfiguration';

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
    password: Yup.string().required('Required field'),
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

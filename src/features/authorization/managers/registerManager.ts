import type { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useApplicationContext } from './../../application/context';
import { registerWithEmailAndPassword } from 'src/firebase';

export const useRegisterManager = () => {
  const { changeDisplayName } = useApplicationContext();

  const initialValues = {
    name: '',
    email: '',
    password: '',
    message: '',
  };

  type FormValues = typeof initialValues;

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required('Required field'),
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
      await registerWithEmailAndPassword({
        name: values.name,
        email: values.email,
        password: values.password,
        changeDisplayName,
      });
      resetForm();
    } catch (e) {
      setFieldError('message', 'Error while signing in!');
    }
  };

  return {
    onSubmit,
    SignupSchema,
    initialValues,
  };
};

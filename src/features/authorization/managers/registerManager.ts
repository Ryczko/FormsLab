import { useState } from 'react';
import { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useApplicationContext } from 'features/application/context';
import { registerWithEmailAndPassword } from 'firebaseConfiguration';

export const useRegisterManager = () => {
  const { changeDisplayName } = useApplicationContext();
  const [isRegistering, setIsRegistering] = useState(false);

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
      .min(8, 'Password must be at least 8 characters long')
      .max(64, 'Password can be up to 64 characters long')
      .required('Required field')
      .test('no-spaces', 'Password cannot contain only spaces', (value) => {
        return value.trim() !== '';
      }),
  });

  const onSubmit = async (
    values: FormValues,
    { resetForm, setFieldError }: FormikHelpers<FormValues>
  ) => {
    setIsRegistering(true);
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
    setIsRegistering(false);
  };

  return {
    onSubmit,
    SignupSchema,
    initialValues,
    isRegistering,
  };
};

import { FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useApplicationContext } from 'src/features/application/context';
import { logInWithEmailAndPassword } from 'src/firebase';
import * as Yup from 'yup';

export const useLoginManager = () => {
  const { loading, user } = useApplicationContext();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, loading, router]);

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
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        'Enter correct password'
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

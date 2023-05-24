import { useState } from 'react';
import { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import useTranslation from 'next-translate/useTranslation';
import axios from 'axios';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

export const useRegisterManager = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const { t } = useTranslation();

  const router = useRouter();

  const initialValues = {
    name: '',
    email: '',
    password: '',
    message: '',
  };

  type FormValues = typeof initialValues;

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required(t('signup:required')),
    email: Yup.string()
      .email(t('signup:incorrectEmail'))
      .required(t('signup:required')),
    password: Yup.string()
      .matches(
        /^[a-zA-Z0-9!@#$%^&*()_+-]+$/,
        t('signup:restrictedCharacterError')
      )
      .min(8, t('signup:passwordLengthMin'))
      .max(64, t('signup:passwordLengthMax'))
      .required(t('signup:required')),
  });

  const onSubmit = async (
    values: FormValues,
    { resetForm, setFieldError }: FormikHelpers<FormValues>
  ) => {
    setIsRegistering(true);
    try {
      await axios.post('/api/register', {
        name: values.name,
        email: values.email,
        password: values.password,
      });

      await signIn('credentials', {
        email: values.email,
        password: values.password,
        callbackUrl: '/',
        redirect: false,
      });

      router.push('/');

      resetForm();
    } catch (e) {
      setFieldError('message', t('signup:errorSingingUp'));
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

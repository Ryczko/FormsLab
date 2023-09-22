import { useState } from 'react';
import { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import useTranslation from 'next-translate/useTranslation';
import { signIn } from 'next-auth/react';
import { postFetch } from '../../../../lib/axiosConfig';
import { isAxiosError } from 'axios';
import { getRedirectRoute } from 'shared/utilities/getRedirectRoute';

export const useRegisterManager = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const { t } = useTranslation();

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
    { setFieldError }: FormikHelpers<FormValues>
  ) => {
    setIsRegistering(true);
    try {
      await postFetch('/api/register', {
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

      window.location.replace(getRedirectRoute());
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.data.message === 'User already exists') {
          setFieldError('email', t('signup:accountWithEmailAlreadyExist'));
        }
      } else {
        setFieldError('message', t('signup:errorSingingUp'));
      }
      setIsRegistering(false);
    }
  };

  return {
    onSubmit,
    SignupSchema,
    initialValues,
    isRegistering,
  };
};

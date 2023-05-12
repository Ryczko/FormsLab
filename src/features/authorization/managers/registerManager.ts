import { useState } from 'react';
import { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useApplicationContext } from 'features/application/context';
import { registerWithEmailAndPassword } from 'firebaseConfiguration';
import useTranslation from 'next-translate/useTranslation';

export const useRegisterManager = () => {
  const { changeDisplayName } = useApplicationContext();
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
      await registerWithEmailAndPassword({
        name: values.name,
        email: values.email,
        password: values.password,
        changeDisplayName,
        registerError: t('signup:registerError'),
        accountAlreadyExist: t('signup:accountAlreadyExist'),
      });

      // MIGRATION TO NEXT-AUTH
      // await axios.post('/api/register', {
      //   name: values.name,
      //   email: values.email,
      //   password: values.password,
      // });

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

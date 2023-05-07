import { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { logInWithEmailAndPassword } from 'firebaseConfiguration';
import useTranslation from 'next-translate/useTranslation';

export const useLoginManager = () => {
  const { t } = useTranslation();
  const initialValues = {
    email: '',
    password: '',
    message: '',
  };

  type FormValues = typeof initialValues;

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('login:incorrectEmail'))
      .required(t('login:required')),
    password: Yup.string().required(t('login:required')),
  });

  const onSubmit = async (
    values: FormValues,
    { resetForm, setFieldError }: FormikHelpers<FormValues>
  ) => {
    try {
      await logInWithEmailAndPassword({
        email: values.email,
        password: values.password,
        authError: t('firebaseConfig:authError'),
      });
      resetForm();
    } catch (e) {
      setFieldError('message', t('login:errorSingingIn'));
    }
  };

  return {
    initialValues,
    LoginSchema,
    onSubmit,
  };
};

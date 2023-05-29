import { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import useTranslation from 'next-translate/useTranslation';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const useLoginManager = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    const { error } = router.query;
    if (!error) return;

    switch (error) {
      case 'OAuthAccountNotLinked':
        toast.error(t('login:differentProvider'));
        break;
      default:
        toast.error(t('login:authError'));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    setIsSubmitting(true);
    try {
      const user = await signIn('credentials', {
        email: values.email,
        password: values.password,
        callbackUrl: '/',
        redirect: false,
      });

      if (user?.ok) {
        window.location.replace('/');
      } else {
        toast.error(t('login:wrongCredentails'));
      }
    } catch (e) {
      toast.error(t('login:authError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const onGoogleLogin = async () => {
    await signIn('google', {
      callbackUrl: '/',
      redirect: false,
    });
  };

  const onGithubLogin = async () => {
    await signIn('github', {
      callbackUrl: '/',
      redirect: false,
    });
  };

  return {
    initialValues,
    LoginSchema,
    onSubmit,
    onGoogleLogin,
    onGithubLogin,
    isSubmitting,
  };
};

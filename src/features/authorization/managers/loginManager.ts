import { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import useTranslation from 'next-translate/useTranslation';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getRedirectRoute } from 'shared/utilities/getRedirectRoute';

export const useLoginManager = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);

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
        window.location.replace(getRedirectRoute());
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
    setIsGoogleLoading(true);
    await signIn('google', {
      callbackUrl: getRedirectRoute(),
      redirect: false,
    });
  };

  const onGithubLogin = async () => {
    setIsGithubLoading(true);
    await signIn('github', {
      callbackUrl: getRedirectRoute(),
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
    isGoogleLoading,
    isGithubLoading,
  };
};

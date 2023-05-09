import { Form, Formik } from 'formik';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { signInWithGoogle, signInWithGithub } from 'firebaseConfiguration';
import withAnimation from 'shared/HOC/withAnimation';
import Header from 'shared/components/Header/Header';
import LoginButton from 'shared/components/LoginButton/LoginButton';
import { useApplicationContext } from 'features/application/context';
import Input from 'shared/components/Input/Input';
import { useLoginManager } from 'features/authorization/managers/loginManager';
import Github from '../../../public/images/github.svg';
import Google from '../../../public/images/google.svg';
import useTranslation from 'next-translate/useTranslation';

function LoginPage() {
  const { loading, user } = useApplicationContext();
  const { initialValues, LoginSchema, onSubmit } = useLoginManager();
  const router = useRouter();
  const { redirect } = router.query;
  const { t } = useTranslation('login');

  useEffect(() => {
    if (user) {
      if (redirect === 'settings') {
        router.push('/settings');
      } else {
        router.push('/');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  return (
    <>
      <Head>
        <title>{t('login:title')}</title>
        <meta name="description" content={t('login:content')} />
      </Head>

      <Header>{t('login:heading')}</Header>
      <div className="flex flex-col items-center justify-center space-y-2">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={LoginSchema}
        >
          {({ values, errors, handleChange, handleSubmit, touched }) => (
            <Form className="flex w-full flex-col sm:w-80">
              <LoginButton
                image={Google}
                onClick={() =>
                  signInWithGoogle(
                    t('login:authError'),
                    t('login:accountWithEmailAlreadyExist')
                  )
                }
              >
                {t('login:googleButton')}
              </LoginButton>
              <LoginButton
                image={Github}
                onClick={() =>
                  signInWithGithub(
                    t('login:authError'),
                    t('login:accountWithEmailAlreadyExist')
                  )
                }
                className="mb-3"
              >
                {t('login:githubButton')}
              </LoginButton>
              <p>{t('login:or')}</p>

              <Input
                type="email"
                value={values.email}
                required
                error={touched.email ? errors.email : undefined}
                placeholder={t('login:email')}
                className="mt-3 !mb-1"
                onChange={handleChange('email')}
              />
              <Input
                type="password"
                value={values.password}
                error={touched.password ? errors.password : undefined}
                required
                placeholder={t('login:password')}
                className="!my-1"
                onChange={handleChange('password')}
              />

              {!!errors.message && (
                <p className="mb-4 max-w-sm self-center text-center text-sm text-red-300">
                  {errors.message}
                </p>
              )}
              <div className="flex flex-col items-center justify-center">
                <LoginButton
                  className="mt-1 mb-2 !bg-indigo-200 !text-indigo-900 hover:!bg-indigo-300"
                  type="submit"
                  onClick={handleSubmit}
                >
                  {t('login:signInButton')}
                </LoginButton>
              </div>
              <Link href={'/signup'} passHref>
                <p
                  data-test-id="signup-link"
                  className="mt-2 max-w-sm text-center text-sm text-zinc-600 underline hover:cursor-pointer"
                >
                  {t('login:dontHaveAccount')}
                </p>
              </Link>
            </Form>
          )}
        </Formik>
      </div>
      {loading && (
        <div className="text-center text-sm text-zinc-600">
          {t('login:loading')}
        </div>
      )}
    </>
  );
}

export default withAnimation(LoginPage);

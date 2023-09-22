import { Form, Formik } from 'formik';
import Head from 'next/head';
import Link from 'next/link';
import withAnimation from 'shared/HOC/withAnimation';
import Header from 'shared/components/Header/Header';
import LoginButton from 'shared/components/LoginButton/LoginButton';
import Input from 'shared/components/Input/Input';
import { useLoginManager } from 'features/authorization/managers/loginManager';
import Github from '../../../public/images/github.svg';
import Google from '../../../public/images/google.svg';
import useTranslation from 'next-translate/useTranslation';
import AuthFormWrapper from 'features/authorization/components/AuthFormWrapper';
import { getSession } from 'next-auth/react';
import { NextPageContext } from 'next';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

function LoginPage() {
  const {
    initialValues,
    LoginSchema,
    onSubmit,
    onGoogleLogin,
    onGithubLogin,
    isSubmitting,
    isGoogleLoading,
    isGithubLoading,
  } = useLoginManager();
  const { t } = useTranslation('login');

  return (
    <>
      <Head>
        <title>{t('login:title')}</title>
        <meta name="description" content={t('login:content')} />
      </Head>

      <AuthFormWrapper>
        <Header>{t('login:heading')}</Header>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={LoginSchema}
        >
          {({ values, errors, handleChange, handleSubmit, touched }) => (
            <Form className="flex w-full flex-col">
              <LoginButton
                isLoading={isGoogleLoading}
                image={Google}
                onClick={onGoogleLogin}
              >
                {t('login:googleButton')}
              </LoginButton>
              <LoginButton
                image={Github}
                isLoading={isGithubLoading}
                onClick={onGithubLogin}
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
                className="!mb-1 mt-3"
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
                  className="mb-2 mt-1 !bg-indigo-200 !text-indigo-900 hover:!bg-indigo-300"
                  type="submit"
                  onClick={handleSubmit}
                  isLoading={isSubmitting}
                >
                  {t('login:signInButton')}
                </LoginButton>
              </div>
              <Link scroll={false} href={'/signup'} passHref>
                <p
                  data-test-id="signup-link"
                  className="mt-2 text-center text-sm text-zinc-600 underline hover:cursor-pointer"
                >
                  {t('login:dontHaveAccount')}
                </p>
              </Link>
            </Form>
          )}
        </Formik>
      </AuthFormWrapper>
    </>
  );
}

export default withAnimation(LoginPage);

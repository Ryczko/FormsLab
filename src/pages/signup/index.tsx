import { useState } from 'react';
import { Form, Formik } from 'formik';
import Head from 'next/head';
import Link from 'next/link';
import withAnimation from 'shared/HOC/withAnimation';
import Header from 'shared/components/Header/Header';
import LoginButton from 'shared/components/LoginButton/LoginButton';
import Input from 'shared/components/Input/Input';
import { useRegisterManager } from 'features/authorization/managers/registerManager';
import useTranslation from 'next-translate/useTranslation';
import AuthFormWrapper from 'features/authorization/components/AuthFormWrapper';
import { getSession } from 'next-auth/react';
import { NextPageContext } from 'next';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';

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

function SignupPage() {
  const { initialValues, onSubmit, SignupSchema, isRegistering } =
    useRegisterManager();
  const { t } = useTranslation('signup');

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('content')} />
      </Head>

      <AuthFormWrapper>
        <Header>{t('heading')}</Header>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={SignupSchema}
        >
          {({ values, errors, handleChange, handleSubmit, touched }) => (
            <Form className="flex w-full flex-col">
              <Input
                type="text"
                name="name"
                value={values.name}
                required
                error={touched.name ? errors.name : undefined}
                placeholder={t('name')}
                onChange={handleChange('name')}
                className="!my-1"
              />
              <Input
                type="email"
                className="!my-1"
                value={values.email}
                required
                error={touched.email ? errors.email : undefined}
                placeholder={t('email')}
                onChange={handleChange('email')}
              />
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  className="!my-1"
                  value={values.password}
                  error={touched.password ? errors.password : undefined}
                  required
                  placeholder={t('password')}
                  onChange={handleChange('password')}
                />
                {showPassword ? (
                  <EyeIcon
                    onClick={() => setShowPassword(false)}
                    className="absolute right-4 top-4 h-6 w-6 text-gray-400 cursor-pointer"
                  />
                ) : (
                  <EyeOffIcon
                    onClick={() => setShowPassword(true)}
                    className="absolute right-4 top-4 h-6 w-6 text-gray-400 cursor-pointer"
                  />
                )}
              </div>
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
                  isLoading={isRegistering}
                >
                  {t('signUpButton')}
                </LoginButton>
              </div>
              <Link scroll={false} href={'/login'} passHref>
                <p className="mt-2 text-center text-sm text-zinc-600 underline hover:cursor-pointer">
                  {t('alreadyHaveAccount')}
                </p>
              </Link>
            </Form>
          )}
        </Formik>
      </AuthFormWrapper>
    </>
  );
}

export default withAnimation(SignupPage);

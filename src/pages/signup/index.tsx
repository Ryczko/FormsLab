import { Form, Formik } from 'formik';
import Head from 'next/head';
import router from 'next/router';
import { useEffect } from 'react';
import Link from 'next/link';
import withAnimation from 'shared/HOC/withAnimation';
import Header from 'shared/components/Header/Header';
import LoginButton from 'shared/components/LoginButton/LoginButton';
import Input from 'shared/components/Input/Input';
import { useRegisterManager } from 'features/authorization/managers/registerManager';
import { useApplicationContext } from 'features/application/context';
import useTranslation from 'next-translate/useTranslation';

function SignupPage() {
  const { user } = useApplicationContext();
  const { initialValues, onSubmit, SignupSchema, isRegistering } =
    useRegisterManager();
  const { t } = useTranslation('signup');

  useEffect(() => {
    if (user) {
      router.push('/', undefined, { scroll: false });
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('content')} />
      </Head>

      <Header>{t('heading')}</Header>
      <div className="flex flex-col items-center justify-center space-y-2">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={SignupSchema}
        >
          {({ values, errors, handleChange, handleSubmit, touched }) => (
            <Form className="flex w-full flex-col sm:w-80">
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
              <Input
                type="password"
                className="!my-1"
                value={values.password}
                error={touched.password ? errors.password : undefined}
                required
                placeholder={t('password')}
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
                  isLoading={isRegistering}
                >
                  {t('signUpButton')}
                </LoginButton>
              </div>
              <Link scroll={false} href={'/login'} passHref>
                <p className="mt-2 max-w-sm text-center text-sm text-zinc-600 underline hover:cursor-pointer">
                  {t('alreadyHaveAccount')}
                </p>
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default withAnimation(SignupPage);

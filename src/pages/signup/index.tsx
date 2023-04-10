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

function SignupPage() {
  const { loading, user } = useApplicationContext();
  const { initialValues, onSubmit, SignupSchema, isRegistering } =
    useRegisterManager();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, loading]);

  return (
    <>
      <Head>
        <title>Sign up</title>
        <meta name="description" content="Sign up - Employee Pulse" />
      </Head>
      <div className="container m-auto px-4 text-center md:px-8">
        <Header>Sign up</Header>
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
                  placeholder="Name"
                  onChange={handleChange('name')}
                  className="!my-1"
                />
                <Input
                  type="email"
                  className="!my-1"
                  value={values.email}
                  required
                  error={touched.email ? errors.email : undefined}
                  placeholder="E-mail"
                  onChange={handleChange('email')}
                />
                <Input
                  type="password"
                  className="!my-1"
                  value={values.password}
                  error={touched.password ? errors.password : undefined}
                  required
                  placeholder="Password"
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
                    isLoading={isRegistering}
                  >
                    Sign up
                  </LoginButton>
                </div>
                <Link href={'/login'} passHref>
                  <p className="mt-2 max-w-sm text-center text-sm text-zinc-600 underline hover:cursor-pointer">
                    Already have an account?
                  </p>
                </Link>
              </Form>
            )}
          </Formik>
        </div>
        {loading && (
          <div className="text-center text-sm text-zinc-600">Loading...</div>
        )}
      </div>
    </>
  );
}

export default withAnimation(SignupPage);

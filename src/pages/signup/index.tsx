import { Form, Formik } from 'formik';
import withAnimation from '../../shared/HOC/withAnimation';
import Head from 'next/head';
import Header from 'src/shared/components/Header/Header';
import LoginButton from 'src/shared/components/LoginButton/LoginButton';
import Input from 'src/shared/components/Input/Input';
import { useRegisterManager } from 'src/features/authorization/managers/registerManager';
import { useApplicationContext } from 'src/features/application/context';
import router from 'next/router';
import { useEffect } from 'react';
import Link from 'next/link';

function SignupPage() {
  const { loading, user } = useApplicationContext();
  const { initialValues, onSubmit, SignupSchema } = useRegisterManager();

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
      <div className="container px-4 m-auto text-center md:px-8">
        <Header>Sign up</Header>
        <div className="flex flex-col justify-center items-center space-y-2">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={SignupSchema}
          >
            {({ values, errors, handleChange, handleSubmit, touched }) => (
              <Form className="flex flex-col w-64 sm:w-80">
                <Input
                  type="text"
                  value={values.name}
                  required
                  error={touched.name ? errors.name : undefined}
                  placeholder="Name"
                  onChange={handleChange('name')}
                  className="!my-1"
                />
                <Input
                  type="text"
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
                  <p className="self-center mb-4 max-w-sm text-sm text-center text-red-300">
                    {errors.message}
                  </p>
                )}

                <div className="flex flex-col justify-center items-center">
                  <LoginButton
                    className="mt-1 text-indigo-900 bg-indigo-200 hover:bg-indigo-300"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Sign up
                  </LoginButton>
                </div>
                <Link href={'/login'} passHref>
                  <p className="mt-2 max-w-sm text-sm text-center text-zinc-600 underline hover:cursor-pointer">
                    Already have an account?
                  </p>
                </Link>
              </Form>
            )}
          </Formik>
        </div>
        {loading && (
          <div className="text-sm text-center text-zinc-600">Loading...</div>
        )}
      </div>
    </>
  );
}

export default withAnimation(SignupPage);

import { signInWithGoogle, signInWithGithub } from '../../firebase';
import { Form, Formik } from 'formik';
import withAnimation from '../../shared/HOC/withAnimation';
import Head from 'next/head';
import Header from 'src/shared/components/Header/Header';
import LoginButton from 'src/shared/components/LoginButton/LoginButton';
import { useApplicationContext } from 'src/features/application/context';
import Input from 'src/shared/components/Input/Input';
import Link from 'next/link';
import { useLoginManager } from 'src/features/authorization/managers/loginManager';
import router from 'next/router';
import { useEffect } from 'react';

function LoginPage() {
  const { loading, user } = useApplicationContext();
  const { initialValues, LoginSchema, onSubmit } = useLoginManager();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, loading]);

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login - Employee Pulse" />
      </Head>
      <div className="container px-4 m-auto text-center md:px-8">
        <Header>Sign in</Header>
        <div className="flex flex-col justify-center items-center space-y-2">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={LoginSchema}
          >
            {({ values, errors, handleChange, handleSubmit, touched }) => (
              <Form className="flex flex-col w-64 sm:w-80">
                <LoginButton
                  image={'/images/google.svg'}
                  onClick={signInWithGoogle}
                >
                  Sign in with Google
                </LoginButton>
                <LoginButton
                  image={'/images/github.svg'}
                  onClick={signInWithGithub}
                  className="mb-3"
                >
                  Sign in with Github
                </LoginButton>
                <p>OR</p>

                <Input
                  type="text"
                  value={values.email}
                  required
                  error={touched.email ? errors.email : undefined}
                  placeholder="E-mail"
                  className="mt-3 mb-1"
                  onChange={handleChange('email')}
                />
                <Input
                  type="password"
                  value={values.password}
                  error={touched.password ? errors.password : undefined}
                  required
                  placeholder="Password"
                  className="!my-1"
                  onChange={handleChange('password')}
                />

                {!!errors.message && (
                  <p className="self-center mb-4 max-w-sm text-sm text-center text-red-300">
                    {errors.message}
                  </p>
                )}
                <div className="flex flex-col justify-center items-center">
                  <LoginButton
                    className="mt-1 mb-2 text-indigo-900 bg-indigo-200 hover:!bg-indigo-300"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Sign in
                  </LoginButton>
                </div>
                <Link href={'/signup'} passHref>
                  <p className="mt-2 max-w-sm text-sm text-center text-zinc-600 underline hover:cursor-pointer">
                    Don&apos;t have an account?
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

export default withAnimation(LoginPage);

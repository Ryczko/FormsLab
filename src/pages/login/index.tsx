import { Form, Formik } from 'formik';
import Head from 'next/head';
import Link from 'next/link';
import router from 'next/router';
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
      <div className="container m-auto px-4 text-center md:px-8">
        <Header>Sign in</Header>
        <div className="flex flex-col items-center justify-center space-y-2">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={LoginSchema}
          >
            {({ values, errors, handleChange, handleSubmit, touched }) => (
              <Form className="flex w-64 flex-col sm:w-80">
                <LoginButton image={Google} onClick={signInWithGoogle}>
                  Sign in with Google
                </LoginButton>
                <LoginButton
                  image={Github}
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
                  className="mt-3 !mb-1"
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
                    Sign in
                  </LoginButton>
                </div>
                <Link href={'/signup'} passHref>
                  <p className="mt-2 max-w-sm text-center text-sm text-zinc-600 underline hover:cursor-pointer">
                    Don&apos;t have an account?
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

export default withAnimation(LoginPage);

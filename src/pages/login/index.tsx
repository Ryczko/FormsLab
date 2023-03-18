import {
  logInWithEmailAndPassword,
  signInWithGoogle,
  signInWithGithub,
} from '../../firebase';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import withAnimation from '../../shared/HOC/withAnimation';
import Head from 'next/head';
import Header from 'src/shared/components/Header/Header';
import LoginButton from 'src/shared/components/LoginButton/LoginButton';
import { useApplicationContext } from 'src/features/application/context';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Input from 'src/shared/components/Input/Input';
import Link from 'next/link';

const initialValues = {
  email: '',
  password: '',
  message: '',
};

type FormValues = typeof initialValues;

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Incorrect email address')
    .required('Required field'),
  password: Yup.string()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Enter correct password')
    .required('Required field'),
});

function LoginPage() {
  const { loading, error, user } = useApplicationContext();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, loading, router]);

  const onSubmit = async (
    values: FormValues,
    { resetForm, setFieldError }: FormikHelpers<FormValues>
  ) => {
    try {
      await logInWithEmailAndPassword({
        email: values.email,
        password: values.password,
      });
      resetForm();
    } catch (e) {
      setFieldError('message', 'Error while signing in!');
    }
  };

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
                <Input
                  type="text"
                  value={values.email}
                  required
                  error={touched.email ? errors.email : undefined}
                  placeholder="E-mail"
                  onChange={handleChange('email')}
                />
                <Input
                  type="password"
                  value={values.password}
                  error={touched.password ? errors.password : undefined}
                  required
                  placeholder="Password"
                  onChange={handleChange('password')}
                />
                <Link href={'/signup'} passHref>
                  <p className="max-w-sm text-sm text-right text-zinc-600 underline hover:cursor-pointer">
                    {'Don\'t have an account?'}
                  </p>
                </Link>
                <p className="self-center mb-4 max-w-sm text-sm text-center text-red-300">
                  {errors.message}
                </p>
                <div className="flex flex-col justify-center items-center">
                  <LoginButton type="submit" onClick={handleSubmit}>
                    Sign in with credentials
                  </LoginButton>
                  <p>OR</p>
                  <LoginButton
                    image={'/images/google.svg'}
                    onClick={signInWithGoogle}
                  >
                    Sign in with Google
                  </LoginButton>
                  <LoginButton
                    image={'/images/github.svg'}
                    onClick={signInWithGithub}
                  >
                    Sign in with Github
                  </LoginButton>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        {loading && (
          <div className="text-sm text-center text-zinc-600">Loading...</div>
        )}
        {error && (
          <div className="text-sm text-center text-red-600">
            Error: {error.message}
          </div>
        )}
      </div>
    </>
  );
}

export default withAnimation(LoginPage);

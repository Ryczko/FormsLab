import { registerWithEmailAndPassword } from '../../firebase';
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

const initialValues = {
  name: '',
  email: '',
  password: '',
  message: '',
};

type FormValues = typeof initialValues;

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Required field'),
  email: Yup.string()
    .email('Incorrect email address')
    .required('Required field'),
  password: Yup.string()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Enter correct password')
    .required('Required field'),
});

function SignupPage() {
  const { loading, error, user } = useApplicationContext();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, loading]);

  const onSubmit = async (
    values: FormValues,
    { resetForm, setFieldError }: FormikHelpers<FormValues>
  ) => {
    try {
      await registerWithEmailAndPassword({
        name: values.name,
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
                />
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
                <p className="self-center mb-4 max-w-sm text-sm text-center text-red-300">
                  {errors.message}
                </p>
                <div className="flex flex-col justify-center items-center">
                  <LoginButton type="submit" onClick={handleSubmit}>
                    Sign up
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

export default withAnimation(SignupPage);

import { Form, Formik } from 'formik';
import Link from 'next/link';
import Header from 'shared/components/Header/Header';
import LoginButton from 'shared/components/LoginButton/LoginButton';
import Input from 'shared/components/Input/Input';
import { useRegisterManager } from 'features/authorization/managers/registerManager';
import useTranslation from 'next-translate/useTranslation';
import AuthFormWrapper from 'features/authorization/components/AuthFormWrapper';

export default function SignUpCard() {
  const { t } = useTranslation('signup');

  const { initialValues, onSubmit, SignupSchema, isRegistering } =
    useRegisterManager();

  return (
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
                className="mb-2 mt-1 border-indigo-200 !bg-indigo-200 !text-indigo-900 hover:!bg-indigo-300"
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
  );
}

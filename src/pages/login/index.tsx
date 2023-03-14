import { signInWithGoogle, signInWithGithub } from '../../firebase';
import withAnimation from '../../shared/HOC/withAnimation';
import Head from 'next/head';
import Header from 'src/shared/components/Header/Header';
import LoginButton from 'src/shared/components/LoginButton/LoginButton';
import { useApplicationContext } from 'src/features/application/context';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function LoginPage() {
  const { loading, error, user } = useApplicationContext();

  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, loading]);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="container px-4 m-auto text-center md:px-8">
        <Header>Sign in</Header>
        <div className="flex flex-col justify-center items-center space-y-2">
          <LoginButton image={'/images/google.svg'} onClick={signInWithGoogle}>
            Sign in with Google
          </LoginButton>
          <LoginButton image={'/images/github.svg'} onClick={signInWithGithub}>
            Sign in with Github
          </LoginButton>
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

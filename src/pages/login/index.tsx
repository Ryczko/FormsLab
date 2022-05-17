import { useEffect } from 'react';
import LoginButton from '../../components/LoginButton';
import { auth, signInWithGoogle, signInWithGithub } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Header from '../../components/Header';
import withAnimation from '../../HOC/withAnimation';
import { useRouter } from 'next/router';
import Head from 'next/head';

function LoginPage() {
  const [user, loading, error] = useAuthState(auth);
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
        <div className="flex flex-col items-center justify-center space-y-2">
          <LoginButton image={'/google.svg'} onClick={signInWithGoogle}>
            Sign in with Google
          </LoginButton>
          <LoginButton image={'/github.svg'} onClick={signInWithGithub}>
            Sign in with Github
          </LoginButton>
        </div>
        {loading && (
          <div className="text-center text-zinc-600 text-sm">Loading...</div>
        )}
        {error && (
          <div className="text-center text-red-600 text-sm">
            Error: {error.message}
          </div>
        )}
      </div>
    </>
  );
}

export default withAnimation(LoginPage);

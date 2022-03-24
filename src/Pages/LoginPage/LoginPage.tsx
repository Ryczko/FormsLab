import { useEffect } from 'react';
import Github from '../../Assets/github.svg';
import Google from '../../Assets/google.svg';
import LoginButton from '../../Components/LoginButton/LoginButton';
import {
  auth,
  signInWithGoogle,
  signInWithGithub,
  logout,
} from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Button, { ButtonVariant } from '../../Components/Button';

// todo: clean up code and add other providers
function LoginPage() {
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      console.log('user', user);
    }
  }, [user, loading]);

  return (
    <div className="container px-4 m-auto mt-10 text-center md:px-8">
      <h1 className="text-6xl font-bold text-center">Sign In</h1>
      <div className="flex flex-col items-center justify-center pt-16">
        <LoginButton
          image={Google}
          loginType="Sign in with Google"
          onClick={signInWithGoogle}
        />
        <LoginButton
          image={Github}
          loginType="Sign in with Github"
          onClick={signInWithGithub}
        />
      </div>
      {loading && (
        <div className="text-center text-zinc-600 text-sm">Loading...</div>
      )}
      {error && (
        <div className="text-center text-red-600 text-sm">
          Error: {error.message}
        </div>
      )}
      {user && (
        <div className="m-4">
          <div className="text-center text-zinc-600 text-sm">
            Logged in as {user.displayName} ({user.email})
          </div>
          <Button variant={ButtonVariant.DANGER} onClick={logout}>
            Logout
          </Button>
        </div>
      )}
    </div>
  );
}

export default LoginPage;

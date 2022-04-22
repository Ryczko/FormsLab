import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Github from '../../Assets/github.svg';
import Google from '../../Assets/google.svg';
import LoginButton from '../../Components/LoginButton';
import { auth, signInWithGoogle, signInWithGithub } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocumentTitle } from '../../Hooks/useDocumentTitle';

function LoginPage() {
  useDocumentTitle('Login');

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, loading]);

  return (
    <div className="container px-4 m-auto mt-10 text-center md:px-8">
      <h1 className="text-5xl font-bold text-center">Sign In</h1>
      <div className="flex flex-col items-center justify-center pt-8 space-y-4">
        <LoginButton image={Google} onClick={signInWithGoogle}>
          Sign in with Google
        </LoginButton>
        <LoginButton image={Github} onClick={signInWithGithub}>
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
  );
}

export default LoginPage;

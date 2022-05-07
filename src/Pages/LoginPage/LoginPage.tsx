import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Github from '../../Assets/github.svg';
import Google from '../../Assets/google.svg';
import LoginButton from '../../Components/LoginButton';
import { auth, signInWithGoogle, signInWithGithub } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocumentTitle } from '../../Hooks/useDocumentTitle';
import Header from '../../Components/Header';

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
    <div className="container px-4 m-auto text-center md:px-8">
      <Header>Sign in</Header>
      <div className="flex flex-col items-center justify-center space-y-2">
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

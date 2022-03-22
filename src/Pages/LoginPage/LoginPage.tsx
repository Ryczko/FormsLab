import Github from '../../Assets/github.svg';
import Google from '../../Assets/google.svg';
import Microsoft from '../../Assets/microsoft.svg';
import LoginButton from '../../Components/LoginButton/LoginButton';

function LoginPage() {
  return (
    <div className="container px-4 m-auto mt-10 text-center md:px-8">
      <h1 className="text-6xl font-bold text-center">Sign In</h1>
      <div className="flex flex-col items-center justify-center pt-16">
        <LoginButton image={Google} href="https://www.google.com/" loginType="Sign in with Google" />
        <LoginButton image={Microsoft} href="https://www.microsoft.com/" loginType="Sign in with Microsoft" />
        <LoginButton image={Github} href="https://www.github.com/" loginType="Sign in with Github" />
      </div>
    </div>
  );
}

export default LoginPage;

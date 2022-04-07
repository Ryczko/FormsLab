import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import Button, { ButtonSize, ButtonVariant } from '../../Components/Button';
import { auth, logout } from '../../firebase';
import Logo from '../Logo';

function Navigation() {
  const [user, loading] = useAuthState(auth);

  return (
    <nav className="py-5 border-b border-neutral-200">
      <div className="flex justify-between px-4 md:px-8">
        <Logo />
        {!loading && user ? (
          <div className='flex space-x-2'>
            <p className='sm:flex truncate items-center justify-left hidden sm:w-fit'>{user.email}</p>
            <Button onClick={logout} sizeType={ButtonSize.MEDIUM} variant={ButtonVariant.OUTLINE_PRIMARY}>
              Sign Out
            </Button>
          </div>
        ) : (
          <Link to={'/login'}>
            <Button variant={ButtonVariant.OUTLINE_PRIMARY}>Sign In</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navigation;

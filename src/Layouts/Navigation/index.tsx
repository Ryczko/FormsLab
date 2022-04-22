import { LogoutIcon } from '@heroicons/react/outline';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import Button, { ButtonVariant } from '../../Components/Button';
import IconButton, { IconButtonVariant } from '../../Components/IconButton';
import { auth, logout } from '../../firebase';
import Logo from '../Logo';

function Navigation() {
  const [user, loading] = useAuthState(auth);

  return (
    <nav className="py-5 border-b border-neutral-200">
      <div className="flex justify-between px-4 md:px-8">
        <Logo />
        {!loading && user ? (
          <div className="flex space-x-2">
            <p className="sm:flex truncate items-center justify-left hidden sm:w-fit">
              {user.email}
            </p>
            <IconButton
              onClick={logout}
              variant={IconButtonVariant.FLAT}
              className="hover:bg-red-100 text-red-600"
              icon={<LogoutIcon className="w-5 h-5" />}
            >
              Sign Out
            </IconButton>
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

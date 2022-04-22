import { LogoutIcon, MenuIcon } from '@heroicons/react/outline';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Button, { ButtonVariant } from '../../Components/Button';
import { signOut } from 'firebase/auth';
import IconButton, { IconButtonVariant } from '../../Components/IconButton';
import { auth } from '../../firebase';
import Logo from '../Logo';
import BurgerMenu from '../../Components/BurgerMenu/BurgerMenu';

function Navigation() {
  const [user, loading] = useAuthState(auth);
  const [isOpen, setIsOpen] = useState(false);

  const logoutDesktop = () => {
    signOut(auth);
  };

  const logoutMobile = () => {
    signOut(auth);
    setIsOpen(!isOpen);
  };
  return (
    <nav className="py-5 border-b border-neutral-200">
      <div className="flex justify-between px-4 md:px-8">
        <Logo />
        {!loading && user ? (
          <div className="flex md:space-x-20">
            <div className="hidden space-x-4 md:block">
              <Link to={'/survey/create'}>
                <Button variant={ButtonVariant.FLAT}>Create Survey</Button>
              </Link>
              <Link to={'/surveys'}>
                <Button variant={ButtonVariant.FLAT}>My Surveys</Button>
              </Link>
            </div>
            <div className="sm:flex hidden">
              <p className="sm:flex truncate items-center justify-left hidden sm:w-fit">
                {user.email}
              </p>
              <IconButton
                onClick={logoutDesktop}
                variant={IconButtonVariant.FLAT}
                className="hover:bg-red-100 text-red-600"
                icon={<LogoutIcon className="w-5 h-5" />}
              >
                Sign Out
              </IconButton>
            </div>
            <MenuIcon
              onClick={() => setIsOpen(!isOpen)}
              className="z-50 w-8 h-8 cursor-pointer md:hidden"
            />
          </div>
        ) : (
          <Link to={'/login'}>
            <Button variant={ButtonVariant.OUTLINE_PRIMARY}>Sign In</Button>
          </Link>
        )}
      </div>
      <BurgerMenu isOpen={isOpen}>
        <Link className="mb-4" to={'/survey/create'}>
          <Button
            onClick={() => setIsOpen(!isOpen)}
            variant={ButtonVariant.FLAT}
          >
            Create Survey
          </Button>
        </Link>
        <Link className="mb-4" to={'/surveys'}>
          <Button
            onClick={() => setIsOpen(!isOpen)}
            variant={ButtonVariant.FLAT}
          >
            My Surveys
          </Button>
        </Link>
        <IconButton
          onClick={logoutMobile}
          variant={IconButtonVariant.FLAT}
          className="hover:bg-red-100 text-red-600"
          icon={<LogoutIcon className="w-5 h-5" />}
        >
          Sign Out
        </IconButton>
      </BurgerMenu>
    </nav>
  );
}

export default Navigation;

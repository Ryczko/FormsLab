import { LogoutIcon, MenuIcon } from '@heroicons/react/outline';
import { useAuthState } from 'react-firebase-hooks/auth';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import Logo from '../Logo/Logo';
import { Menu, Transition } from '@headlessui/react';
import ButtonLink from '../ButtonLink/ButtonLink';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { ButtonVariant } from '../Button/Button';
import IconButton, { IconButtonVariant } from '../IconButton/IconButton';

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
    <nav className="fixed z-10 w-full border-b border-neutral-200 bg-zinc-100 py-5">
      <div className="flex justify-between px-4 md:px-8">
        <Logo />
        {!loading && user ? (
          <div className="flex md:space-x-4">
            <div className="none hidden space-x-4 lg:flex">
              <Link href={'/survey/create'} passHref>
                <ButtonLink variant={ButtonVariant.FLAT}>
                  Create Survey
                </ButtonLink>
              </Link>
              <Link href={'/surveys'} passHref>
                <ButtonLink variant={ButtonVariant.FLAT}>My Surveys</ButtonLink>
              </Link>
            </div>
            <div className="hidden items-center justify-center lg:flex">
              <Menu
                as="div"
                className="relative inline-block rounded-md text-left"
              >
                <Menu.Button
                  title="Expand menu"
                  className="flex w-full justify-center rounded-md py-1 px-4 font-medium hover:bg-zinc-200"
                >
                  <p className="justify-left ml-2 hidden items-center truncate sm:flex">
                    {user.displayName}
                    {user.photoURL && (
                      <img
                        src={user.photoURL}
                        alt="user photo"
                        className="ml-4 h-8 w-8 rounded-full"
                      />
                    )}
                  </p>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 origin-top-right divide-y divide-zinc-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="flex justify-end p-1">
                      <Menu.Item>
                        <IconButton
                          onClick={logoutDesktop}
                          variant={IconButtonVariant.FLAT}
                          className="w-40 text-red-600 hover:bg-red-100"
                          icon={<LogoutIcon className="h-5 w-5" />}
                        >
                          Sign Out
                        </IconButton>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <MenuIcon
              onClick={() => setIsOpen(!isOpen)}
              className="z-50 h-8 w-8 cursor-pointer lg:hidden"
            />
          </div>
        ) : (
          <Link href={'/login'} passHref>
            <ButtonLink variant={ButtonVariant.OUTLINE_PRIMARY}>
              Sign In
            </ButtonLink>
          </Link>
        )}
      </div>
      <BurgerMenu isOpen={isOpen}>
        <Link href={'/survey/create'} passHref>
          <ButtonLink
            onClick={() => setIsOpen(!isOpen)}
            variant={ButtonVariant.FLAT}
            className="mb-3 w-[95%] lg:w-auto"
          >
            Create Survey
          </ButtonLink>
        </Link>
        <Link href={'/surveys'} passHref>
          <ButtonLink
            className="mb-3  w-[95%] lg:w-auto"
            onClick={() => setIsOpen(!isOpen)}
            variant={ButtonVariant.FLAT}
          >
            My Surveys
          </ButtonLink>
        </Link>
        <IconButton
          onClick={logoutMobile}
          variant={IconButtonVariant.FLAT}
          className="w-[95%] justify-center text-red-600 hover:bg-red-100 lg:w-auto"
          icon={<LogoutIcon className="h-5 w-5" />}
        >
          Sign Out
        </IconButton>
      </BurgerMenu>
    </nav>
  );
}

export default Navigation;

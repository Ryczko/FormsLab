import { LogoutIcon, MenuIcon } from '@heroicons/react/outline';
import { useAuthState } from 'react-firebase-hooks/auth';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { ButtonVariant } from '../Button';
import { signOut } from 'firebase/auth';
import IconButton, { IconButtonVariant } from '../IconButton';
import { auth } from '../../firebase';
import Logo from '../Logo/Logo';
import BurgerMenu from '../BurgerMenu';
import { Menu, Transition } from '@headlessui/react';
import ButtonLink from '../ButtonLink/ButtonLink';

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
    <nav className="py-5 fixed z-10 w-full border-b bg-zinc-100 border-neutral-200">
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
            <div className="lg:flex justify-center items-center hidden">
              <Menu
                as="div"
                className="relative inline-block text-left rounded-md"
              >
                <Menu.Button
                  title="Expand menu"
                  className="flex w-full justify-center hover:bg-zinc-200 py-1 rounded-md px-4 font-medium"
                >
                  <p className="truncate items-center hidden justify-left sm:flex ml-2">
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
                    <div className="px-1 py-1 flex justify-end">
                      <Menu.Item>
                        <IconButton
                          onClick={logoutDesktop}
                          variant={IconButtonVariant.FLAT}
                          className="hover:bg-red-100 text-red-600 w-40"
                          icon={<LogoutIcon className="w-5 h-5" />}
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
              className="z-50 w-8 h-8 cursor-pointer lg:hidden"
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
          className="hover:bg-red-100 text-red-600 w-[95%] lg:w-auto justify-center"
          icon={<LogoutIcon className="w-5 h-5" />}
        >
          Sign Out
        </IconButton>
      </BurgerMenu>
    </nav>
  );
}

export default Navigation;

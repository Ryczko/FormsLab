import { LogoutIcon, MenuIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import Logo from '../Logo/Logo';
import { Menu, Transition } from '@headlessui/react';
import ButtonLink from '../../shared/components/ButtonLink/ButtonLink';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { ButtonVariant } from '../../shared/components/Button/Button';
import IconButton, {
  IconButtonVariant,
} from '../../shared/components/IconButton/IconButton';
import Image from 'next/image';
import { useApplicationContext } from 'src/features/application/context';
import AvatarIcon from '../../../public/images/avatar.svg';
import GithubCorner from '../GithubCorner/GithubCorner';

function Navigation() {
  const { user, loading, displayName } = useApplicationContext();

  const [isOpen, setIsOpen] = useState(false);

  const logoutDesktop = () => {
    signOut(auth);
  };

  const logoutMobile = () => {
    signOut(auth);
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex fixed z-10 items-center  w-full h-[70px] bg-zinc-100 border-b border-neutral-200">
      <GithubCorner />

      <div
        className={`flex grow ${
          user ? 'justify-between' : 'justify-center small-sm:justify-between'
        } items-center px-4 md:px-8`}
      >
        <Logo />
        {!loading && user ? (
          <div className="flex md:space-x-4">
            <div className="hidden space-x-4 lg:flex none">
              <Link href={'/survey/create'} passHref>
                <ButtonLink variant={ButtonVariant.FLAT}>
                  Create Survey
                </ButtonLink>
              </Link>
              <Link href={'/surveys'} passHref>
                <ButtonLink variant={ButtonVariant.FLAT}>My Surveys</ButtonLink>
              </Link>
            </div>
            <div className="hidden justify-center items-center lg:flex">
              <Menu
                as="div"
                className="inline-block relative text-left rounded-md"
              >
                <Menu.Button
                  title="Expand menu"
                  className="flex justify-center items-center py-1 px-4 w-full font-medium hover:bg-zinc-200 rounded-md"
                >
                  <p className="hidden items-center mr-4 ml-2 truncate sm:block">
                    {displayName}
                  </p>
                  {user.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt="user photo"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <Image
                      src={AvatarIcon}
                      alt="user photo"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  )}
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
                  <Menu.Items className="absolute right-0 mt-2 bg-white rounded-md divide-y divide-zinc-100 focus:outline-none ring-1 ring-black ring-opacity-5 shadow-lg origin-top-right">
                    <div className="flex justify-end p-1">
                      <Menu.Item>
                        <IconButton
                          onClick={logoutDesktop}
                          variant={IconButtonVariant.FLAT}
                          className="w-40 text-red-600 hover:bg-red-100"
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
            <ButtonLink
              className="hidden small-sm:block"
              variant={ButtonVariant.OUTLINE_PRIMARY}
            >
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
          className="justify-center w-[95%] text-red-600 hover:bg-red-100 lg:w-auto"
          icon={<LogoutIcon className="w-5 h-5" />}
        >
          Sign Out
        </IconButton>
      </BurgerMenu>
    </nav>
  );
}

export default Navigation;

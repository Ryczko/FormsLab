import { CogIcon, LogoutIcon, MenuIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { signOut } from 'firebase/auth';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import { auth } from 'firebaseConfiguration';
import Logo from 'layout/Logo/Logo';
import ButtonLink from 'shared/components/ButtonLink/ButtonLink';
import BurgerMenu from 'layout/BurgerMenu/BurgerMenu';
import Button, { ButtonVariant } from 'shared/components/Button/Button';
import AvatarIcon from '../../../public/images/avatar.svg';
import GithubCorner from 'layout/GithubCorner/GithubCorner';
import { useApplicationContext } from 'features/application/context';
import IconButtonLink from 'shared/components/IconButtonLink/IconButtonLink';
import useTranslation from 'next-translate/useTranslation';

function Navigation() {
  const { user, loading, displayName } = useApplicationContext();

  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('common');

  const logout = async () => {
    signOut(auth);
    setIsOpen(false);
  };

  return (
    <nav className="fixed z-10 flex h-[70px]  w-full items-center border-b border-neutral-200 bg-zinc-100">
      <GithubCorner />

      <div
        className={`flex grow ${
          user ? 'justify-between' : 'justify-center xsm:justify-between'
        } items-center px-4 xsm:pl-20 md:pr-8`}
      >
        <Logo />
        {!loading && user ? (
          <div className="flex md:space-x-4">
            <div className="none hidden space-x-4 lg:flex">
              <ButtonLink variant={ButtonVariant.FLAT} href={'/survey/create'}>
                {t('navigation.createSurveyButton')}
              </ButtonLink>

              <ButtonLink variant={ButtonVariant.FLAT} href={'/surveys'}>
                {t('navigation.mySurveysButton')}
              </ButtonLink>
            </div>
            <div className="hidden items-center justify-center lg:flex">
              <Menu
                as="div"
                className="relative inline-block rounded-md text-left"
              >
                <Menu.Button
                  title="Expand menu"
                  className="flex w-full items-center justify-center rounded-md py-1 px-4 font-medium hover:bg-zinc-200"
                >
                  <p className="mr-4 ml-2 hidden items-center truncate sm:block">
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
                  <Menu.Items className="absolute right-0 mt-2 origin-top-right divide-y divide-zinc-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="flex flex-col justify-end p-1">
                      {process.env.NEXT_PUBLIC_REMOVE_ACCOUNT && (
                        <Menu.Item>
                          <IconButtonLink
                            variant={ButtonVariant.FLAT}
                            href={'/settings'}
                            icon={<CogIcon className="h-5 w-5" />}
                          >
                            {t('navigation.settingsButton')}
                          </IconButtonLink>
                        </Menu.Item>
                      )}
                      <Menu.Item>
                        <Button
                          onClick={logout}
                          variant={ButtonVariant.FLAT}
                          className="w-40 text-red-600 hover:bg-red-100"
                          icon={<LogoutIcon className="h-5 w-5" />}
                        >
                          {t('navigation.signOutButton')}
                        </Button>
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
          <ButtonLink
            className="hidden px-4 xsm:block sm:px-6"
            href={'/login'}
            variant={ButtonVariant.OUTLINE_PRIMARY}
          >
            {t('navigation.signInButton')}
          </ButtonLink>
        )}
      </div>
      <BurgerMenu isOpen={isOpen}>
        <ButtonLink
          href={'/survey/create'}
          onClick={() => setIsOpen(!isOpen)}
          variant={ButtonVariant.FLAT}
          className="mb-3 w-[95%] lg:w-auto"
        >
          {t('navigation.createSurveyButton')}
        </ButtonLink>
        <ButtonLink
          href={'/surveys'}
          className="mb-3 w-[95%] lg:w-auto"
          onClick={() => setIsOpen(!isOpen)}
          variant={ButtonVariant.FLAT}
        >
          {t('navigation.mySurveysButton')}
        </ButtonLink>
        {process.env.NEXT_PUBLIC_REMOVE_ACCOUNT && (
          <IconButtonLink
            className="mb-3 w-[95%] justify-center lg:w-auto"
            href="/settings"
            onClick={() => setIsOpen(!isOpen)}
            variant={ButtonVariant.FLAT}
            icon={<CogIcon className="h-5 w-5" />}
          >
            {t('navigation.settingsButton')}
          </IconButtonLink>
        )}
        <Button
          onClick={logout}
          variant={ButtonVariant.FLAT}
          className="w-[95%] justify-center text-red-600 hover:bg-red-100 lg:w-auto"
          icon={<LogoutIcon className="h-5 w-5" />}
        >
          {t('navigation.signOutButton')}
        </Button>
      </BurgerMenu>
    </nav>
  );
}

export default Navigation;

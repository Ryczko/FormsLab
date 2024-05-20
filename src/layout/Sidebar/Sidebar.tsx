import {
  ClipboardListIcon,
  LogoutIcon,
  MenuIcon,
  PlusCircleIcon,
  UserIcon,
  ViewListIcon,
} from '@heroicons/react/outline';
import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Logo from 'layout/Logo/Logo';
import BurgerMenu from 'layout/BurgerMenu/BurgerMenu';
import Button, {
  ButtonSize,
  ButtonVariant,
} from 'shared/components/Button/Button';
import GithubCorner from 'layout/GithubCorner/GithubCorner';
import { useApplicationContext } from 'features/application/context';
import useTranslation from 'next-translate/useTranslation';
import { signOut } from 'next-auth/react';
import Avatar from 'shared/components/Avatar/Avatar';
import ButtonLink from 'shared/components/ButtonLink/ButtonLink';
import { Page } from 'features/application/types/Page';

function Sidebar() {
  const { user, loading, activePage } = useApplicationContext();

  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('common');

  const logout = async () => {
    signOut();
    setIsOpen(false);
    // navigate
  };

  return (
    <nav className="fixed left-0 top-[var(--navigation-height)] z-40 h-[calc(100vh-var(--navigation-height))] w-[170px] border-b border-r bg-white/70 p-2 pt-3 backdrop-blur-md">
      {!loading && user && (
        <div className="flex h-full flex-col justify-between">
          <div className="flex flex-col items-start gap-1">
            <ButtonLink
              className="w-full px-2"
              position="start"
              variant={ButtonVariant.FLAT}
              href={'/surveys'}
            >
              <ClipboardListIcon className="mr-2 h-6 w-6" />
              {t('navigation.mySurveysButton')}
            </ButtonLink>

            <ButtonLink
              className="w-full px-2"
              position="start"
              variant={ButtonVariant.FLAT}
              href={'/survey/create'}
            >
              <PlusCircleIcon className=" mr-2 h-6 w-6" />
              {t('navigation.createSurveyButton')}
            </ButtonLink>
          </div>

          <div className="flex flex-col items-start text-left">
            <Menu
              as="div"
              className="relative inline-block rounded-md text-left"
            >
              <Menu.Button
                title="Expand menu"
                className="flex w-full items-center justify-center rounded-md px-2 py-1 font-medium hover:bg-zinc-200"
              >
                <Avatar src={user.image} size={22} />
                <p className="ml-2 mr-4 hidden items-center truncate text-secondary-800 sm:block">
                  {user.name}
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
                <Menu.Items
                  anchor="bottom end"
                  className="absolute right-0 mt-2 min-w-[160px] origin-top-right divide-y divide-zinc-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div className="p-1">
                    {process.env.NEXT_PUBLIC_PROFILE_SETTINGS && (
                      <Menu.Item>
                        <ButtonLink
                          variant={ButtonVariant.FLAT}
                          sizeType={ButtonSize.FULL}
                          href={'/account'}
                          icon={<UserIcon className="h-5 w-5" />}
                        >
                          <span className="ms-1">Account</span>
                        </ButtonLink>
                      </Menu.Item>
                    )}

                    <Menu.Item>
                      <Button
                        onClick={logout}
                        sizeType={ButtonSize.FULL}
                        variant={ButtonVariant.FLAT}
                        className="text-red-600 hover:bg-red-100"
                        icon={<LogoutIcon className="h-5 w-5" />}
                      >
                        {t('navigation.signOutButton')}
                      </Button>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <Button
              onClick={logout}
              sizeType={ButtonSize.FULL}
              variant={ButtonVariant.FLAT}
              className="!justify-start px-3 text-left text-red-600 hover:bg-red-100"
              icon={<LogoutIcon className="me-1 h-5 w-5" />}
            >
              {t('navigation.signOutButton')}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Sidebar;

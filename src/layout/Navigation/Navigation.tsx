import { LogoutIcon, MenuIcon, UserIcon } from '@heroicons/react/outline';
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

function Navigation() {
  const { user, loading, activePage } = useApplicationContext();

  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('common');

  const logout = async () => {
    signOut();
    setIsOpen(false);
  };

  const getPageTitle = () => {
    switch (activePage) {
      case Page.CREATE_SURVEY:
        return t('navigation.pageTitles.createSurvey');
      case Page.EDIT_SURVEY:
        return t('navigation.pageTitles.editSurvey');
      case Page.SURVEYS_LIST:
        return t('navigation.pageTitles.mySurveys');
      default:
        return '';
    }
  };

  const pageTitle = getPageTitle();

  return (
    <nav className="fixed left-0 top-0 z-40 flex h-[var(--navigation-height)] w-full items-center border-b bg-white/70 backdrop-blur-md">
      <GithubCorner />

      <div
        className={`flex grow ${
          user ? 'justify-between' : 'justify-center xsm:justify-between'
        } items-center px-4 xsm:pl-20 md:pr-6`}
      >
        <div className="flex items-center gap-6 text-secondary-800">
          <Logo />

          {pageTitle && (
            <div className="hidden items-center gap-6 sm:flex">
              <span>/</span>
              <span className="font-semibold">{pageTitle}</span>
            </div>
          )}
        </div>
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
                  className="flex w-full items-center justify-center rounded-md px-4 py-1 font-medium hover:bg-zinc-200"
                >
                  <p className="ml-2 mr-4 hidden items-center truncate text-secondary-800 sm:block">
                    {user.name}
                  </p>
                  <Avatar src={user.image} />
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
                  <Menu.Items className="absolute right-0 mt-2 min-w-[160px] origin-top-right divide-y divide-zinc-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
          className="mb-2 w-[95%] lg:w-auto"
        >
          {t('navigation.createSurveyButton')}
        </ButtonLink>
        <ButtonLink
          href={'/surveys'}
          onClick={() => setIsOpen(!isOpen)}
          className="mb-2 w-[95%] lg:w-auto"
          variant={ButtonVariant.FLAT}
        >
          {t('navigation.mySurveysButton')}
        </ButtonLink>
        {process.env.NEXT_PUBLIC_PROFILE_SETTINGS && (
          <Button
            className="mb-2 w-[95%] justify-center lg:w-auto"
            href={'/account'}
            onClick={() => setIsOpen(!isOpen)}
            variant={ButtonVariant.FLAT}
            icon={<UserIcon className="h-5 w-5" />}
          >
            Account
          </Button>
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

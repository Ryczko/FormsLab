import Logo from '../Logo/Logo';

function Navigation() {
  return (
    <nav className="py-5 border-b border-neutral-200 top-0 absolute w-full z-10 bg-white">
      <div className="container m-auto flex px-4 md:px-8">
        <Logo />
      </div>
    </nav>
  );
}

export default Navigation;

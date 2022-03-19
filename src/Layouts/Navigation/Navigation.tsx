import Logo from '../Logo/Logo';

function Navigation() {
  return (
    <nav className="py-5 border-b" style={{ borderColor: '#E5E5E5' }}>
      <div className="container m-auto flex px-4 md:px-8">
        <Logo />
      </div>
    </nav>
  );
}

export default Navigation;

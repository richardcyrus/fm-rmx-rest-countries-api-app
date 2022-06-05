import ThemeToggle from '~/components/ThemeToggle';

function Header() {
  return (
    <>
      <header className="site-header">
        <div className="header-wrapper">
          <h1 className="site-title">Where in the world?</h1>
          <div className="theme-switch-container">
            <ThemeToggle />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;

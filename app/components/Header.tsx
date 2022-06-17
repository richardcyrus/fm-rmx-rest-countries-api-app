import { MoonIcon } from '@heroicons/react/outline';

import { Theme, useTheme } from '~/hooks/theme-provider';

function Header() {
  const [, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme((previousTheme) =>
      previousTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    );
  };

  return (
    <>
      <header className="site-header" role="banner">
        <div className="header-wrapper">
          <h1 className="site-title">Where in the world?</h1>
          <div className="theme-switch-container">
            <button
              type="button"
              className="button theme-toggle-button"
              onClick={toggleTheme}
            >
              <MoonIcon className="theme-toggle-icon" />
              Dark Mode
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;

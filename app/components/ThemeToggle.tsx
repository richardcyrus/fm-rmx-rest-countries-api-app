import { MoonIcon } from '@heroicons/react/outline';

function ThemeToggle() {
  return (
    <>
      <button type="button" className="theme-toggle-button">
        <MoonIcon className="theme-toggle-icon" />
        Dark Mode
      </button>
    </>
  );
}

export default ThemeToggle;

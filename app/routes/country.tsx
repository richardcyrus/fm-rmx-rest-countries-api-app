import { Outlet } from '@remix-run/react';

function CountryLayout() {
  return (
    <>
      <main id="main-content" className="country-detail-content">
        <Outlet />
      </main>
    </>
  );
}

export default CountryLayout;

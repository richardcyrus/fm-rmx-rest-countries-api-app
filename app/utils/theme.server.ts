import { createCookieSessionStorage } from '@remix-run/node';

import { Theme, isTheme } from '~/hooks/theme-provider';

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set!');
}

const themeStorage = createCookieSessionStorage({
  cookie: {
    name: 'rest_countries_theme',
    secure: true,
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
  },
});

async function getThemeSession(request: Request) {
  const session = await themeStorage.getSession(request.headers.get('Cookie'));

  return {
    getTheme: () => {
      const themeValue = session.get('theme');
      return isTheme(themeValue) ? themeValue : Theme.LIGHT;
    },
    setTheme: (theme: Theme) => session.set('theme', theme),
    commit: () =>
      themeStorage.commitSession(session, {
        // no theme for you on my 100th birthday! 😂
        expires: new Date('2072-02-07'),
      }),
  };
}

export { getThemeSession };

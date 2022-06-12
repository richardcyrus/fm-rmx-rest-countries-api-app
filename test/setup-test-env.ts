import { installGlobals } from '@remix-run/node/globals';
import '@testing-library/jest-dom/extend-expect';

import server from '@/mocks/server';

installGlobals();
server.listen({ onUnhandledRequest: 'bypass' });

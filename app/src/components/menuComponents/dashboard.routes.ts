import { config } from '../../constants';

const ROUTES = {
  home: {
    path: '/',
  },
  dashboard: {
    path: '/dashboard',
  },
  territories: {
    path: '/territories',
  },
  dncs: {
    path: '/dncs',
  },
};

export const PUBLISHER_ROUTES = {
  home: {
    ...ROUTES.home,
    name: 'Home',
    desktop: true,
  },
  territories: {
    ...ROUTES.territories,
    name: 'Territories',
    desktop: true,
  },
};

export const ADMIN_ROUTES = {
  ...PUBLISHER_ROUTES,
  dncs: {
    ...ROUTES.dncs,
    name: 'DNCs',
    desktop: true,
  },
};

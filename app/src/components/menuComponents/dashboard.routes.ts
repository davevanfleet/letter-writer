import { config } from '../../constants';

const ROUTES = {
  home: {
    path: '/',
    exact: true,
  },
  dashboard: {
    path: '/dashboard',
    exact: false,
  },
  territories: {
    path: '/territories',
    exact: false,
  },
  dncs: {
    path: '/dncs',
    exact: false,
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

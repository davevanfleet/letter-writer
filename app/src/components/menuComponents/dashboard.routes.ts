const ROUTES = {
  home: {
    path: '/',
    exact: true,
    name: 'Home',
    desktop: true,
  },
  dashboard: {
    path: '/dashboard',
    exact: false,
    name: 'Dashboard',
    desktop: true,
  },
  territories: {
    path: '/territories',
    exact: false,
    name: 'Territories',
    desktop: true,
  },
  dncs: {
    path: '/dncs',
    exact: false,
    name: 'DNCs',
    desktop: true,
  },
  uploader: {
    path: '/upload',
    exact: false,
    name: 'Uploads',
    desktop: true,
  },
};

export const PUBLISHER_ROUTES = {
  home: {
    ...ROUTES.home,
  },
  territories: {
    ...ROUTES.territories,
  },
};

export const ADMIN_ROUTES = {
  ...PUBLISHER_ROUTES,
  dncs: {
    ...ROUTES.dncs,
  },
  uploader: {
    ...ROUTES.uploader,
  },
};

export const SUB_NAV_ROUTES: { [index: string]: any } = {
  dnc: {
    byTerritory: {
      name: 'By Territory',
      path: '/dncs',
      exact: false,
      desktop: true,
    },
    all: {
      name: 'All',
      path: '/dncs/all',
      exact: false,
      desktop: true,
    },
  },
  territory: {
    all: {
      name: 'All',
      path: '/territories',
      exact: true,
      desktop: true,
    },
    new: {
      name: 'Add',
      path: '/territories/new',
      exact: true,
      desktop: true,
    },
    records: {
      name: 'Records',
      path: '/territories/records',
      exact: true,
      desktop: true,
    },
  },
  upload: {
    dncs: {
      name: 'DNCs',
      path: '/upload/dncs',
      exact: true,
      desktop: true,
    },
    contacts: {
      name: 'Contacts',
      path: '/upload/contacts',
      exact: true,
      desktop: true,
    },
  },
};

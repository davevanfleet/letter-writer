const ROUTES = {
  home: {
    path: '/',
    exact: true,
    name: 'Home',
    desktop: true,
    authenticated: false,
  },
  dashboard: {
    path: '/dashboard',
    exact: false,
    name: 'Dashboard',
    desktop: true,
    authenticated: false,
  },
  territories: {
    path: '/territories',
    exact: false,
    name: 'Territories',
    desktop: true,
    authenticated: true,
  },
  dncs: {
    path: '/dncs',
    exact: false,
    name: 'DNCs',
    desktop: true,
    authenticated: true,
  },
  uploader: {
    path: '/upload',
    exact: false,
    name: 'Uploads',
    desktop: true,
    authenticated: true,
  },
  users: {
    path: '/users',
    exact: false,
    name: 'Users',
    desktop: true,
    authenticated: true,
  },
  assignments: {
    path: '/assignments',
    exact: false,
    name: 'Assignments',
    desktop: true,
    authenticated: true,
  }
};

export const PUBLISHER_ROUTES = {
  home: {
    ...ROUTES.home,
  },
  assignments: {
    ...ROUTES.assignments,
  },
};

export const ADMIN_ROUTES = {
  ...PUBLISHER_ROUTES,
  dncs: {
    ...ROUTES.dncs,
  },
  territories: {
    ...ROUTES.territories,
  },
  uploader: {
    ...ROUTES.uploader,
  },
  users: {
    ...ROUTES.users,
  }
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

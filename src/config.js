
const basePath = '/demo';

function menuToRoutes(menu, parentPath  = '') {
  return Object.entries(menu).flatMap(([path, item]) => {
    const fullPath = parentPath+path;
    const route = { path: fullPath };
    if (item.title) route.title = item.title;
    if (item.component) route.component = item.component;
    if (item.redirect) route.redirect = item.redirect;

    if (item.pages) {
      const childRoutes = menuToRoutes(item.pages, fullPath);
      return [route, ...childRoutes];
    } else {
      return [route];
    }
  });
}

const menu = {
  '/demo': {
    component: 'page-home',
    title:'Home',
  },
  '/demo/composants': {
    component: 'page-components',
    title:'A few tests',
    pages:{
      '/login': {
        title: 'Login',
        component: 'page-login-simple'
      },
      '/list': {
        title: 'List',
        component: 'page-list'
      }
    }
  },
  '/demo/about': {
    component:'page-about',
    title:'About',
  }
};


const routes = menuToRoutes(menu);

// redirect / to /demo
routes.unshift({
  path: '/',
  redirect: '/demo'
});

// handle 404
routes.push({
  path: '(.*)',
  title: 'Not found',
  component: 'page-not-found'
});

export default {
  basePath,
  routes,
  menu
}


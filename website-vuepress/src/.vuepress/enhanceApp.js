const myRoutes = [
  {
    // force external route to separate SPA app
    path: '/tournaments/',
    beforeEnter(to) {
      console.log('BEFORE ENTER CALLED');
      console.log('to.fullPath: ', to.fullPath);
      location.href = to.fullPath;
    },
  },
  {
    // force external route to separate SPA app
    path: '/tournaments.html',
    beforeEnter(to) {
      location.href = to.fullPath;
    },
  },
];

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData, // site metadata
}) => {
  // ...apply enhancements to the app
  // You can use this hook to install additional Vue plugins, register global components, or add additional router hooks:
  // router.mode = 'hash';
  // router.scrollBehavior = (to, from, savedPosition) => {
  //   if (to.hash) {
  //     return {
  //       selector: to.hash,
  //       offset: { x: 0, y: 10 },
  //     };
  //   }
  //   if (savedPosition) {
  //     return savedPosition;
  //   }
  //   return { x: 0, y: 0 };
  // };

  router.addRoutes(myRoutes);
};

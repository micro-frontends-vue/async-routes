import Vue from 'vue';
import Router from 'vue-router';
import { modules } from './modules';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/app-typescript',
    },
    {
      path: '/404',
      component: {
        name: 'not-found',
        template: '<h1>Not Found</h1>',
      }
    },
  ],
});

const cachedModules = new Set();

const sleep = (time) => new Promise((resolve) => void setTimeout(resolve, time));

router.beforeEach(async (to, from, next) => {

  console.log('entry:', to.path, from.path);
  const [, module] = to.path.split('/');

  if (Reflect.has(modules, module)) {
    if (!cachedModules.has(module)) {
      Vue.prototype.$Progress.start();

      const { default: application } = await window.System.import(modules[module])
      console.log('load application:', application);

      if (application && application.routes) {
        // 动态添加子项目的 route-list
        router.addRoutes(application.routes);
      }

      if (application && application.beforeEach) {
        router.beforeEach((to, from, next) => {
          if (module === to.path.split('/')[1]) {
            application.beforeEach(to, from, next);
          } else {
            next();
          }
        })
      }

      if (application && application.init) {
        await application.init({});
      }

      await sleep(300); // 模拟延迟
      cachedModules.add(module);
      Vue.prototype.$Progress.finish();
      next(to.path);
    } else {
      next();
    }
    return;
  }

  if (to.matched.length) {
    next();
  } else {
    next('/404');
  }
});

export default router;

import Vue from 'vue';
import Router from 'vue-router';
import { loadModule } from './load-helper';
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
  
  console.log('beforeEach:', to.path, from.path);
  const [, module] = to.path.split('/');

  if (Reflect.has(modules, module)) {
    if (!cachedModules.has(module)) {
      Vue.prototype.$Progress.start();
      await loadModule(modules[module]);
      await sleep(300); // 模拟延迟
      cachedModules.add(module);
      Vue.prototype.$Progress.finish();
      next(to.path);
    } else {
      next();
    }
    return 
  }

  if (to.matched.length) {
    next();
  } else {
    next('/404');
  }
});

export default router;

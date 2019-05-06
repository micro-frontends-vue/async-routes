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
  ],
});

router.beforeEach(async (to, from, next) => {
  console.log('beforeEach:', to.path, from.path);
  const [, module] = to.path.split('/');

  if (Reflect.has(modules, module)) {
    loadModule(modules[module]);
    Reflect.deleteProperty(modules, module);
    console.log('loaded:', module);
  }

  next();
});

export default router;

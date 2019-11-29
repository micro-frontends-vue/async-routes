import routes from './routes';

export default {
  name: 'javascript',
  routes,
  beforeEach(from, to, next) {
    console.log('javascript:', from.path, to.path);
    next();
  },
  init() { },
}

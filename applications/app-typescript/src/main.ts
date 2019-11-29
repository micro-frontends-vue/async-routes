import routes from './routes';

export default {
  name: 'typescript',
  routes,
  beforeEach(from: any, to: any, next: any) {
    console.log('typescript:', from.path, to.path);
    next();
  },
  init() { },
}

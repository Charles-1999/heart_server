import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  // router.get('/', controller.home.index);

  router.get('/data', controller.home.get);
  router.post('/data', controller.home.upload);
};

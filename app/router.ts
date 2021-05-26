import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  // router.get('/', controller.home.index);

  router.get('/data', controller.home.get);
  router.get('/data/date', controller.home.getDate);
  router.get('/indexData', controller.home.indexData);
  router.post('/data', controller.home.upload);

  router.get('/tips', controller.tips.getTips);

  router.post('/login', controller.account.login)
};

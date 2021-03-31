import { Controller } from 'egg';

export default class HomeController extends Controller {
  /**
   * 上传数据
   */
  public async upload() {
    const { ctx } = this;
    ctx.body = await ctx.service.home.uploadData(ctx.request.body);
  }

  /**
   * 获取数据
   */
  public async get() {
    const { ctx } = this;
    ctx.body = await ctx.service.home.getData(Number(ctx.query.limit));
  }
}

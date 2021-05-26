import { Controller } from 'egg';

export default class HomeController extends Controller {
  /**
   * 上传数据
   */
  public async upload() {
    const { ctx } = this;

    const userId = await ctx.service.account.getUserId(ctx.request.header.openid as string)

    ctx.body = await ctx.service.home.uploadData(userId, ctx.request.body);
  }

  /**
   * 获取数据
   */
  public async get() {
    const { ctx } = this;

    const userId = await ctx.service.account.getUserId(ctx.request.header.openid as string)

    ctx.body = await ctx.service.home.getData(userId, Number(ctx.query.limit));
  }

  /**
   * 获取打卡日历
   */
  public async getDate() {
    const {ctx} = this

    const userId = await ctx.service.account.getUserId(ctx.request.header.openid as string)

    ctx.body = await ctx.service.home.getDate(userId)
  }

  /**
   * 获取首页数据
   * 今天和昨天记录
   */
  public async indexData() {
    const { ctx } = this;

    const userId = await ctx.service.account.getUserId(ctx.request.header.openid as string)

    ctx.body = await ctx.service.home.getIndexData(userId);
  }
}

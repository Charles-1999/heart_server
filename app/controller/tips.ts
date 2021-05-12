import { Controller } from 'egg';

export default class TipsController extends Controller {
  /**
   * 获取tips
   */
  public async getTips() {
    const { ctx } = this;
    ctx.body = await ctx.service.tips.getTips();
  }
}
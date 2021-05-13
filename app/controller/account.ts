import { Controller } from 'egg'

export default class LoginController extends Controller {
  /**
   * 登陆
   */
  public async login() {
    const { ctx } = this

    const res = await ctx.service.account.login(ctx.request.body)

    ctx.body = res
  }
}
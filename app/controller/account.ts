import { Controller } from 'egg'

export default class LoginController extends Controller {
  /**
   * 登陆
   */
  public async login() {
    const { ctx } = this

    const js_code = ctx.query.code
    const res = await ctx.service.account.login(js_code)

    ctx.body = res
  }
}
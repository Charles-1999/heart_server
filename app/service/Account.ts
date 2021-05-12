import { Service } from 'egg';
const APPID = 'wx9b70ad6f4f545da4'
const SECRET = '2cb6bc59ae1350b029182e2178b47f75'

export default class Login extends Service {
  /**
   * login
   */
  public async login(js_code: string) {
    const res = await this.ctx.curl(`https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${js_code}&grant_type=authorization_code`, {
      dataType: 'json'
    })
    const { openid } = res.data

    const result = await this.app.mysql.get("user", { openid })

    if (!result) {
      await this.app.mysql.insert("user", { openid })
    }

    return { openid }
  }

  /**
   * 通过openid获取userid
   */
  public async getUserId(openid: string): Promise<number> {
    const result = await this.app.mysql.get("user", { openid })

    if (result) {
      return result.id
    } else {
      return -1
    }
  }
}
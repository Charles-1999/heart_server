import { Service } from 'egg';
const APPID = 'wx9b70ad6f4f545da4'
const SECRET = '2cb6bc59ae1350b029182e2178b47f75'

export default class Login extends Service {
  /**
   * login
   * 根据js_code去微信后台获取openid
   * 再根据该openid查询是否存在该用户
   * 
   * 最终返回openid
   */
  public async login(body: any) {
    const { js_code, nickName, gender, language, city, province, country, avatarUrl } = body

    const res = await this.ctx.curl(`https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${js_code}&grant_type=authorization_code`, {
      dataType: 'json'
    })
    const { openid } = res.data

    // 查询是否存在用户
    // const result = await this.app.mysql.get("user", { openid })
    const id = await this.getUserId(openid)

    if (!id) {
      // 若不存在，插入数据
      await this.app.mysql.insert("user", { openid, nickName, gender, language, city, province, country, avatarUrl })
    } else {
      // 若存在，更新信息
      await this.app.mysql.update("user", { id, nickName, gender, language, city, province, country, avatarUrl })
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
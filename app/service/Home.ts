import { Service } from 'egg';
// import Data from '../model/data';
import runPyCode from '../utils/runPy';

/**
 * Home Service
 */
export default class Home extends Service {

  /**
   * upload data
   */
  public async uploadData(userId: number, body: any) {
    const res = await runPyCode(body.data, body.type);
    let data = null;
    if (res && res.data) {
      const { hr_min, hr_max } = res.data;
      if (Number(hr_min) < 0 || Number(hr_max) > 100000) {
        data = null;
      } else {
        await this.app.mysql.insert('data', { ...res.data, user_id: userId });
        data = await this.getData(userId, 1);
      }
    }
    return { data };
  }

  /**
   * get data
   */
  public async getData(userId: number, limit: number) {
    console.log("getData:", userId)
    const data = await this.app.mysql.query(`SELECT * FROM data WHERE user_id=${userId} ORDER BY id desc LIMIT ${limit}`);
    return data;
  }

  /**
   * get index data
   */
  public async getIndexData(userId: number) {
    let today = await this.app.mysql.query(`select * from data where date(timeStamp) = curdate() and user_id=${userId} order by id desc limit 1`);
    let yesterday = await this.app.mysql.query(`select * from data where date(timeStamp) = date_sub(curdate(),interval 1 day) and user_id=${userId} order by id desc limit 1`);
    today.length == 0 ? today = [{}] : null;
    yesterday.length == 0 ? yesterday = [{}] : null;
    return [...today, ...yesterday];
  }
}
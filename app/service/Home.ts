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
  public async uploadData(body: any) {
    const res = await runPyCode(body.data);
    let data = null;
    if (res && res.data) {
      const { hr_min, hr_max } = res.data;
      if (Number(hr_min) < 0 || Number(hr_max) > 150) {
        data = null;
      } else {
        await this.app.mysql.insert('data', res.data);
        data = await this.getData(1);
      }
    }
    return { data };
  }

  /**
   * get data
   */
  public async getData(limit: number) {
    const data = await this.app.mysql.query(`SELECT * FROM data ORDER BY id desc LIMIT ${limit}`);
    return data;
  }
}
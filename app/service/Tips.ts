import { Service } from 'egg';

export default class Home extends Service {
  /**
   * get tips
   */
  public async getTips() {
    const data = await this.app.mysql.query(`SELECT * 
    FROM tips AS t1 JOIN (SELECT ROUND(RAND() * ((SELECT MAX(id) FROM tips)-(SELECT MIN(id) FROM tips))+(SELECT MIN(id) FROM tips)) AS id) AS t2 
    WHERE t1.id >= t2.id 
    ORDER BY t1.id LIMIT 1;`);
    return data;
  }
}
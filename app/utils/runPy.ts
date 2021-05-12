// import fs from 'fs';
import * as child_process from 'child_process';
const util = require('util');

export default async function runPyCode(data, type) {
  const exec = util.promisify(child_process.exec);
  console.log(type)
  const { stdout, stderr } = await exec(`python3 app/python/main.py ${type} "${data}"`);
  console.log('stdout: ' + stdout);
  console.log('stderr: ' + stderr);
  const res = /#(.*)#/.exec(stdout);
  if (res) {
    const [min, max, avg, hrv] = res[1].split('#');
    return {
      data: { 
        hr_min: min,
        hr_max: max,
        hr_avg: avg,
        hrv 
      }
    };
  }


  // let workerProcess = child_process.exec(`python3 app/python/main.py 0 "${data}"`, (err, stdout, stderr) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log('stdout: ' + stdout);
  //   console.log('stderr: ' + stderr);
  // })

  // workerProcess.on('exit', (code) => {
  //   console.log('子进程已退出，退出码 ' + code);
  // });
}
// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAccount from '../../../app/controller/account';
import ExportHome from '../../../app/controller/home';
import ExportTips from '../../../app/controller/tips';

declare module 'egg' {
  interface IController {
    account: ExportAccount;
    home: ExportHome;
    tips: ExportTips;
  }
}

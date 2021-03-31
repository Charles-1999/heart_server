// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportData from '../../../app/model/data';

declare module 'egg' {
  interface IModel {
    Data: ReturnType<typeof ExportData>;
  }
}

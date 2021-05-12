// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAccount from '../../../app/service/Account';
import ExportHome from '../../../app/service/Home';
import ExportTest from '../../../app/service/Test';
import ExportTips from '../../../app/service/Tips';

declare module 'egg' {
  interface IService {
    account: AutoInstanceType<typeof ExportAccount>;
    home: AutoInstanceType<typeof ExportHome>;
    test: AutoInstanceType<typeof ExportTest>;
    tips: AutoInstanceType<typeof ExportTips>;
  }
}

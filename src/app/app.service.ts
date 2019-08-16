import {Injectable} from '@angular/core';
import {HOST} from './host.const';

@Injectable()
export class AppService {
  getHost(): string {
    const url = window.location.href;

    if (url.indexOf(HOST.PROD) !== -1) {
      return HOST.PROD;
    } else if (url.indexOf(HOST.SAND) !== -1) {
      return HOST.SAND;
    }else if (url.indexOf(HOST.TEST) !== -1) {
      return HOST.TEST;
    }else if (url.indexOf(HOST.UAT) !== -1) {
      return HOST.UAT;
    } else {
      return HOST.DEV
    }
  }
}

import { Timestamp } from '@angular/fire/firestore';

export function timestampToDate(obj: any) {
  if (null == obj || 'object' !== typeof obj) {
    return obj;
  }

  if (obj instanceof Timestamp) {
    return obj.toDate();
  }

  let copy: any;

  if (obj instanceof Array) {
    copy = [];
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = timestampToDate(obj[i]);
    }
    return copy;
  }

  if (obj instanceof Object) {
    copy = {};
    for (const attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        copy[attr] = timestampToDate(obj[attr]);
      }
    }

    return copy;
  }

  throw new Error('The object could not be transformed! Type is not supported.');
}

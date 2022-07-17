import { FieldValue } from '@angular/fire/firestore';

export function cloneObject(obj: any) {
  let copy: any;
  if (null == obj || 'object' !== typeof obj) {
    return obj;
  }

  if (obj instanceof FieldValue) {
    return obj;
  }

  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  if (obj instanceof Array) {
    copy = [];
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = cloneObject(obj[i]);
    }
    return copy;
  }

  if (obj instanceof Object) {
    copy = {};
    for (const attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        copy[attr] = cloneObject(obj[attr]);
      }
    }

    for (const prop in copy) {
      if (copy[prop] === undefined) {
        delete copy[prop];
      }
    }

    return copy;
  }

  throw new Error('The object could not be copied! Type is not supported.');
}

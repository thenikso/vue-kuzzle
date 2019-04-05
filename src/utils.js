export function getRootChanges(reference, obj) {
  const res = {};
  for (const key in obj) {
    if (!eq(obj[key], reference[key], true)) {
      res[key] = obj[key];
    }
  }
  return res;
}

export function reapply(options, context) {
  while (typeof options === 'function') {
    options = options.call(context);
  }
  return options;
}

const isArray = Array.isArray;
const keyList = Object.keys;
const hasProp = Object.prototype.hasOwnProperty;
const definedKeyList = obj => {
  const res = [];
  const keys = keyList(obj);
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];
    if (typeof obj[key] !== 'undefined') {
      res.push(key);
    }
  }
  return res;
};

// https://github.com/epoberezkin/fast-deep-equal
export function eq(a, b, ignoreUndefined) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    const arrA = isArray(a);
    const arrB = isArray(b);
    let i;
    let length;
    let key;

    if (arrA && arrB) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0; )
        if (!eq(a[i], b[i], ignoreUndefined)) return false;
      return true;
    }

    if (arrA != arrB) return false;

    const dateA = a instanceof Date;
    const dateB = b instanceof Date;
    if (dateA != dateB) return false;
    if (dateA && dateB) return a.getTime() == b.getTime();

    const regexpA = a instanceof RegExp;
    const regexpB = b instanceof RegExp;
    if (regexpA != regexpB) return false;
    if (regexpA && regexpB) return a.toString() == b.toString();

    const keysA = ignoreUndefined ? definedKeyList(a) : keyList(a);
    const keysB = keyList(b);
    length = keysA.length;

    if (length !== keysB.length) return false;

    for (i = length; i-- !== 0; ) if (!hasProp.call(b, keysA[i])) return false;

    for (i = length; i-- !== 0; ) {
      key = keysA[i];
      if (!eq(a[key], b[key], ignoreUndefined)) return false;
    }

    return true;
  }

  return a !== a && b !== b;
}

import deepEqual from 'fast-deep-equal';

export const eq = deepEqual;

export function getRootChanges(reference, obj) {
  const res = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && !eq(obj[key], reference[key])) {
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

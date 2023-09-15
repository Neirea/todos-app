export const deleteEmptyProperties = <T extends Record<string, unknown>>(obj: T) => {
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      if (!obj[key]) {
        delete obj[key];
      }
    }
  }
  return obj;
};

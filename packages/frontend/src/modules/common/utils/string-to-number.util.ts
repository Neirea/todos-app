export const toNumber = (s: string, fallback: number = NaN) => {
  const parsedValue = parseFloat(s);
  return +s === parsedValue ? parsedValue : fallback;
};

const DIGITS = '0123456789';

export const isNumeric = (value: unknown) => {
  if (typeof value === 'string') {
    const strs = value.split('');
    return strs.every((c) => DIGITS.includes(c));
  }

  return false;
};

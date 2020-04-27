export const calculateSum =  array => {
  return array.reduce((i, c) => {
      const value = c.value <= 9 ? c.value : 9;
      return i + value;
    }, 0);
}
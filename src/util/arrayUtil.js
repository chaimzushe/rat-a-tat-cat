export const calculateSum =  array => {

  return array.reduce((i, c) => {
      const value = c.value <= 9 ? c.value : 9;
      return i + value;
    }, 0);
}

export const shuffleValues = arr => {
  const array = [...arr];
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    const randomIndex = Math.floor(Math.random() * index);
    const randomElement = array[randomIndex];
    const curValue = element.value;
    element.value = randomElement.value;
    randomElement.value = curValue;
  }
  return array;
};

export const getAvailableOptions = (availableOptions: string[]) => {
  const namesWithValues = availableOptions.map((option) => ({
    name: option,
    value: option,
  }));

  return namesWithValues;
};

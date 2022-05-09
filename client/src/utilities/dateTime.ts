const getTimeFormattedString = (time: string): string => {
  const date = new Date(time);
  return `${date.toDateString()} - ${date.toLocaleTimeString()}`;
};

// eslint-disable-next-line import/prefer-default-export
export { getTimeFormattedString };

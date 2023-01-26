const getTodaysDate = () => {
  const event = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
  const options = {
    // weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return event.toLocaleDateString(undefined, options);
};

export default getTodaysDate;

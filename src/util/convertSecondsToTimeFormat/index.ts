const convertSecondsToTimeFormat = (duration: number): string => {
  const secondsInAnHour = 3600; // 1 hour in seconds
  const secondsToMilliseconds = duration * 1000;

  if (duration >= secondsInAnHour * 24) {
    return "24:00:00";
  }

  const time =
    secondsInAnHour <= duration
      ? new Date(secondsToMilliseconds).toISOString().substring(11, 19) // shows HH:MM:SS
      : new Date(secondsToMilliseconds).toISOString().substring(14, 19); // shows MM:SS

  return time;
};

export default convertSecondsToTimeFormat;

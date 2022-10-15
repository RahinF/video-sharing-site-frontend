export const convertDurationToTime = (duration: number) => {
  const hour = 3600; // 1 hour in seconds

  const time =
    hour <= duration
      ? new Date(duration * 1000).toISOString().substring(11, 19) // shows HH:MM:SS
      : new Date(duration * 1000).toISOString().substring(14, 19); // shows MM:SS

  return time;
};

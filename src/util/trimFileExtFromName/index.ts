const trimFileExtFromName = (string: string): string => {
  return string.replace(/\.[^/.]+$/, '');
};

export default trimFileExtFromName;

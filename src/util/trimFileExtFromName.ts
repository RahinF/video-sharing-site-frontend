const trimFileExtFromName = (string: string) => {
  return string.replace(/\.[^/.]+$/, "");
};

export default trimFileExtFromName;

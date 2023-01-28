import pluralize from "pluralize";

/**
 * @param number 
 * @description abbreviates number e.g 1000 => 1k
 * @returns string
 */
export const abbreviateNumber = (number: number) => {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
  }).format(number);
};

/**
 * @param number 
 * @description formats number e.g 1000000 => 1,000,000
 * @returns string
 */
export const formatNumber = (number: number) => {
  return Intl.NumberFormat("en-US").format(number);
};

/**
 * 
 * @param word 
 * @param number 
 * @description abbreviates and pluralizes e.g 1k comments
 * @returns string
 */
export const pluralizeAndAbbreviateNumber = (word: string, number: number) => {
  return `${abbreviateNumber(number)} ${pluralize(word, number)}`;
};

/**
 * 
 * @param word 
 * @param number 
 * @description formats and pluralizes e.g 1,000,000 comments
 * @returns string
 */
export const pluralizeAndFormatNumber = (word: string, number: number) => {
  return `${formatNumber(number)}  ${pluralize(word, number)}`;
};

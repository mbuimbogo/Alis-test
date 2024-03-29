export const getAllEnumKeys = <T>(enumType: T): Array<keyof T> => {
  return Object.keys(enumType).filter((key) => isNaN(Number(key))) as Array<
    keyof T
  >;
};

export const getAllEnumValues = <T>(enumType: T): Array<T[keyof T]> => {
  return getAllEnumKeys(enumType).map((key) => enumType[key]);
};

export const getAllEnumEntries = <T>(
  enumType: T,
): Array<[keyof T, T[keyof T]]> => {
  return getAllEnumKeys(enumType).map((key) => [key, enumType[key]]);
};

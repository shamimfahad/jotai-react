export const genUniqueId = (): string =>
  Math.random().toString(36).substring(2, 11);

export const parseToRegex = (value: string): RegExp => {
  const regexMatch = value.match(/^\/(.+)\/([gimsuy]*)$/);

  if (regexMatch) {
    const [, pattern, flags] = regexMatch;
    return new RegExp(pattern, flags);
  }

  return new RegExp(value);
};

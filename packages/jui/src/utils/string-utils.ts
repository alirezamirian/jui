export function isWordSeparator(c: string) {
  return (
    isWhitespace(c) || c == "_" || c == "-" || c == ":" || c == "+" || c == "."
  );
}

export function isWhitespace(char: string): boolean {
  return /^\s*$/.test(char);
}

export function isUpperCase(str: string) {
  return str.toUpperCase() === str && str.toLowerCase() !== str;
}

import { createRangesFromIndices, TextRange } from "./TextRange";
import {
  isUpperCase,
  isWhitespace,
  isWordSeparator,
} from "./utils/string-utils";

function isMeaningfulChar(ch: string) {
  return !isWordSeparator(ch) && !isWhitespace(ch);
}

// Simplified version of https://github.com/JetBrains/intellij-community/blob/master/platform/util/text-matching/src/com/intellij/psi/codeStyle/MinusculeMatcherImpl.java
export const minusculeMatch = (
  input: string,
  rawPattern: string
): Array<TextRange> | null => {
  const isStarts = input.split("").map(isStart);
  const pattern = rawPattern.split("").filter(isMeaningfulChar).join("");
  const matches: Array<{ patternIndex: number; inputIndex: number }> = [];
  let continuous = false;
  let inputIndex = 0,
    patternIndex = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (matches.length === pattern.length) {
      return createRangesFromIndices(matches.map(({ inputIndex: i }) => i));
    }
    if (inputIndex > input.length - 1) {
      if (matches.length > 0) {
        // TODO: the same character match can be popped out and in several times, if something
        //  is popped out, it should never be added back again, since it's already examined without
        //  a full match.
        const lastMatch = matches.pop()!;
        inputIndex = lastMatch.inputIndex + 1;
        patternIndex = lastMatch.patternIndex;
        continue;
      }
      break;
    }
    if (!isMeaningfulChar(input[inputIndex])) {
      inputIndex++;
      continue;
    }
    if (
      pattern[patternIndex].toLowerCase() === input[inputIndex].toLowerCase() &&
      (continuous || isStarts[inputIndex] || matches.length === 0)
    ) {
      matches.push({ patternIndex, inputIndex });
      continuous = true;
      patternIndex++;
      inputIndex++;
    } else {
      continuous = false;
      inputIndex++;
    }
  }
  return null;
};

function isStart(char: string, index: number, chars: string[]): boolean {
  const previousChar = chars[index - 1];
  return (
    index === 0 ||
    (isWordSeparator(previousChar) && !isWordSeparator(char)) ||
    (isUpperCase(char) && !isUpperCase(previousChar))
  );
}

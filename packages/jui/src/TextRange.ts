export type TextRange = { from: number; to: number };

export function isEmptyRange(range: TextRange) {
  return range.from > range.to;
}

export function getAllRanges(
  ranges: TextRange[],
  length: number
): Array<[TextRange, boolean]> {
  const result: Array<[TextRange, boolean]> = [];
  if (!ranges?.length) {
    return [[{ from: 0, to: length - 1 }, false]];
  }
  if (ranges[0].from > 0) {
    result.push([{ from: 0, to: ranges[0].from - 1 }, false]);
  }
  ranges.forEach(({ from, to }, index) => {
    result.push([{ from, to }, true]);
    const gapRange: TextRange = ranges[index + 1]
      ? { from: to + 1, to: ranges[index + 1].from - 1 }
      : { from: to + 1, to: length - 1 };
    if (!isEmptyRange(gapRange)) {
      result.push([gapRange, false]);
    }
  });
  return result;
}

export function createRangesFromIndices(indices: number[]): TextRange[] {
  return indices.reduce((ranges, index) => {
    const lastRange = ranges.slice(-1)[0];
    if (lastRange?.to === index - 1) {
      return [...ranges.slice(0, -1), { from: lastRange.from, to: index }];
    }
    return [...ranges, { from: index, to: index }];
  }, [] as TextRange[]);
}

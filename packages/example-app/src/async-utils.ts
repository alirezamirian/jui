export async function asyncFilter<T>(
  predicate: (item: T) => Promise<boolean>,
  array: T[]
) {
  const predicateResult = await Promise.all(
    array.map((item) => predicate(item).catch(() => false))
  );
  return array.filter((item, index) => predicateResult[index]);
}

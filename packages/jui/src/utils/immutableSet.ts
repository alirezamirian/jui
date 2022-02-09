export class ImmutableSet<T> implements ReadonlySet<T> {
  readonly size: number;
  private readonly set: ReadonlySet<T>;

  constructor(values: Iterable<T>) {
    this.set = new Set(values);
    this.size = this.set.size;
  }

  add(...items: T[]): ImmutableSet<T> {
    return this.setValueWithMutation((newValue) => {
      items.forEach((item) => {
        newValue.add(item);
      });
    });
  }

  delete(...items: T[]): ImmutableSet<T> {
    return this.setValueWithMutation((newValue) => {
      items.forEach((item) => {
        newValue.delete(item);
      });
    });
  }

  toggle(...items: T[]): ImmutableSet<T> {
    return this.setValueWithMutation((newValue) => {
      items.forEach((item) => {
        if (!newValue.delete(item)) {
          newValue.add(item);
        }
      });
    });
  }

  clear(): ImmutableSet<T> {
    return this.setValueWithMutation((newValue) => {
      newValue.clear();
    });
  }

  private setValueWithMutation(
    mutate: (newValue: Set<T>) => void
  ): ImmutableSet<T> {
    const newValue = new Set(this.set);
    mutate(newValue);
    return new ImmutableSet(newValue);
  }

  ////////////////////////////////////////////////// delegated methods /////////////////////////////////////////////////
  forEach(...args: Parameters<ReadonlySet<T>["forEach"]>): void {
    return this.set.forEach(...args);
  }

  has(value: T): boolean {
    return this.set.has(value);
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this.set[Symbol.iterator]();
  }

  entries(): IterableIterator<[T, T]> {
    return this.set.entries();
  }

  keys(): IterableIterator<T> {
    return this.set.keys();
  }

  values(): IterableIterator<T> {
    return this.set.values();
  }
}

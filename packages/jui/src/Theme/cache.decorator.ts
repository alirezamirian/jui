interface CacheDecoratorOptions {
  /**
   * If true, when a returned promise is eventually rejected, the cache is not cleared for that key,
   * resulting the next call not to retry the async operation.
   * @default false
   */
  cacheAsyncErrors?: boolean;
}

/**
 * A very simple cache decorator without any option, to be used for caching theme property values.
 * If more improved caching is required, a proper library can be used.
 */
export const cache: (
  options?: CacheDecoratorOptions
) => TypedMethodDecorator = ({ cacheAsyncErrors = false } = {}) =>
  function (target, propertyName, descriptor) {
    const method = descriptor.value!;

    descriptor.value = function (this: any, ...args: any[]) {
      const cacheKey = `__cache__${String(propertyName)}`;
      this[cacheKey] = this[cacheKey] || {};
      const cacheObj: Record<string, any> = this[cacheKey];

      const allArgsAreString = args.every((arg) => typeof arg === "string");
      if (allArgsAreString) {
        const key = args.join("_");
        if (!cacheObj[key]) {
          cacheObj[key] = method.apply(this, args);

          // if returned value is a promise, we will clear cache in case it fails
          if (cacheObj[key] instanceof Promise && !cacheAsyncErrors) {
            cacheObj[key].catch(() => {
              delete cacheObj[key];
            });
          }
        }
        return cacheObj[key];
      } else {
        console.warn(
          `could not cache or use cached value for ${method.name}. not all arguments are string:`,
          ...args
        );
        return method.apply(this, args);
      }
    } as any;
  };
type TypedMethodDecorator = <T extends Function>(
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<T>
) => TypedPropertyDescriptor<T> | void;

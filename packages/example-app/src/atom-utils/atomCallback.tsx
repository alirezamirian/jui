import { Getter, Setter } from "jotai";

type Callback<A extends any[], R> = (get: Getter, set: Setter, ...args: A) => R;
type ResolvedCallback<Callback extends (...args: any[]) => any> =
  Callback extends (get: Getter, set: Setter, ...args: infer A) => infer R
    ? (...args: A) => R
    : never;
type ResolvedCallbacks<C extends Record<string, Callback<any, any>>> = {
  [K in keyof C as K extends `${infer name}Callback`
    ? name
    : K]: ResolvedCallback<C[K]>;
};

/**
 * A helper to create callbacks to be used with useAtomCallback.
 * - Makes it easier to compose callbacks
 * - Provides a slightly better signature for the atom callback where
 *   get and set are properties of a single argument, rather than two arguments.
 *   So a callback that doesn't need `get` doesn't have to define an unused
 *   parameter.
 * - Makes it not necessary to import Getter and Setter types everytime
 *   a callback is to be defined outside a component where useAtomCallback
 *   is called.
 */

type ComposedCallback<
  C extends Record<string, Callback<any, any>>,
  Args extends any[],
  R
> = (
  args: { get: Getter; set: Setter } & ResolvedCallbacks<C>,
  ...callbackArgs: Args
) => R;

export function atomCallback<Args extends any[], R>(
  fn: ComposedCallback<{}, Args, R>
): (get: Getter, set: Setter, ...args: Args) => R;
export function atomCallback<
  Args extends any[],
  R,
  C extends Record<string, Callback<any, any>>
>(
  callbacksOrFn: C,
  fn: ComposedCallback<C, Args, R>
): (get: Getter, set: Setter, ...args: Args) => R;
export function atomCallback<
  Args extends any[],
  R,
  C extends Record<string, Callback<any, any>>
>(
  fnOrCallbacks: C | ComposedCallback<{}, Args, R>,
  maybeFn?: ComposedCallback<C, Args, R>
): (get: Getter, set: Setter, ...args: Args) => R {
  const fn = typeof fnOrCallbacks === "function" ? fnOrCallbacks : maybeFn!;
  const callbacks = typeof fnOrCallbacks === "object" ? fnOrCallbacks : null;
  return (get: Getter, set: Setter, ...args: Args) => {
    const resolvedCallbacks = Object.fromEntries(
      Object.entries(callbacks ?? {}).map(([key, fn]) => {
        const resolvedCallback: ResolvedCallback<typeof fn> = (...args) =>
          fn(get, set, ...args);
        return [key.replace(/(.*?)(Callback)?$/, "$1"), resolvedCallback];
      })
    ) as ResolvedCallbacks<C>;
    return fn({ get, set, ...resolvedCallbacks }, ...args);
  };
}

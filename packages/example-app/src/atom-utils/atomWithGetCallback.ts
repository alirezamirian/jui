import { atom, Getter, Setter } from "jotai";

type GetCallback = <Args extends unknown[], Result>(
  callback: (get: Getter, set: Setter, ...args: Args) => Result
) => (...args: Args) => Result;
type ReadWithGetCallback<Value, SetSelf = never> = (
  get: Getter,
  options: {
    readonly signal: AbortSignal;
    readonly setSelf: SetSelf;
    readonly getCallback: GetCallback;
  }
) => Value;

const getCallbackAtom = atom<GetCallback, [], { get: Getter; set: Setter }>(
  (_get, { setSelf }) => {
    return (callback) => {
      return (...args) => {
        const { get, set } = setSelf();
        return callback(get, set, ...args);
      };
    };
  },
  (get, set) => ({ get, set })
);

export const atomWithGetCallback = <Value>(
  read: ReadWithGetCallback<Value>
) => {
  return atom((get, options) => {
    const getCallback = get(getCallbackAtom);
    return read(
      get,
      Object.assign(options, {
        getCallback,
      }) /* spreading over options calls getter for setSelf and signal, so we fall back to mutating the passed option */
    );
  });
};

/**
 * Set function name.
 *
 * Note that this won't have effect on built-in Chrome stack traces, although
 * useful for traces generated by `redux-saga`.
 */
export default function setFunctionName<F extends Function>(func: F, name: string): F {
  try {
    Object.defineProperty(func, 'name', {
      value: name,
      configurable: true,
    });
  } catch (e) {
    // ignore
  }

  return func;
}

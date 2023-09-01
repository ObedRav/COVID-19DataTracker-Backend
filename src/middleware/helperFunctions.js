/**
 * Takes an object as input and returns a new object where the keys and
 * values are swapped.
 * @param obj - The `obj` parameter is an object that you want to invert.
 * @returns an inverted object where the keys and values of the original object are swapped.
 */
export function invertObject (obj) {
  const invertedObject = {};

  for (const [key, value] of Object.entries(obj)) {
    invertedObject[value] = key;
  }

  return invertedObject;
}

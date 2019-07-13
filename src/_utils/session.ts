/**
 * Returns a clone of the input array with the specified item inserted into
 * a random position of the new array's second half
 * @param arr - array to insert into
 * @param item - item to insert
 */
export const insertSecondHalf = <T>(arr: T[], item: T) => {
  const l = [...arr];
  const halfLength = Math.ceil(l.length / 2);
  l.splice(
    halfLength + Math.round(Math.random() * halfLength),
    0,
    item,
  );
  return l;
};

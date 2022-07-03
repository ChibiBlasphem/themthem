export function getKeys<O>(o: O): (keyof O)[] {
  return Object.keys(o) as (keyof O)[];
}

export function getKeys<O extends object>(o: O): (keyof O)[] {
  return Object.keys(o) as (keyof O)[];
}

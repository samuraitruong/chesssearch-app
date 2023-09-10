export function partitionListIntoPairs<T>(arr: T[]): Array<T[]> {
  return arr.reduce((result, current, index) => {
    if (index % 2 === 0) {
      result.push([current]);
    } else {
      result[Math.floor(index / 2)].push(current);
    }
    return result;
  }, [] as Array<T[]>);
}

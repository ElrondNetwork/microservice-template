Array.prototype.groupBy = function <T>(predicate: (item: T) => string, asArray = false) {
  let result = this.reduce(function (rv, x) {
    (rv[predicate(x)] = rv[predicate(x)] || []).push(x);
    return rv;
  }, {});

  if (asArray === true) {
    result = Object.keys(result).map(key => {
      return {
        key: key,
        values: result[key],
      };
    });
  }

  return result;
};

Array.prototype.selectMany = function <T, TOUT>(predicate: (item: T) => TOUT[]) {
  const result = [];

  for (const item of this) {
    result.push(...predicate(item));
  }

  return result;
};

Array.prototype.firstOrUndefined = function <T>(predicate?: (item: T) => boolean) {
  if (!predicate) {
    if (this.length > 0) {
      return this[0];
    }

    return undefined;
  }

  const result = this.filter(x => predicate(x));
  if (result.length > 0) {
    return result[0];
  }

  return undefined;
};

Array.prototype.zip = function <T, TSecond, TResult>(second: TSecond[], predicate: (first: T, second: TSecond) => TResult): TResult[] {
  return this.map((element: T, index: number) => predicate(element, second[index]));
};

Array.prototype.remove = function <T>(element: T): number {
  const index = this.indexOf(element);
  if (index >= 0) {
    this.splice(index, 1);
  }

  return index;
};

Array.prototype.findMissingElements = function <T>(second: T[]) {
  const missing: T[] = [];
  for (const item of this) {
    if (!second.includes(item)) {
      missing.push(item);
    }
  }

  return missing;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare interface Array<T> {
  groupBy(predicate: (item: T) => string): { [key: string]: T };
  selectMany<TOUT>(predicate: (item: T) => TOUT[]): TOUT[];
  firstOrUndefined(predicate?: (item: T) => boolean): T | undefined;
  zip<TSecond, TResult>(second: TSecond[], predicate: (first: T, second: TSecond) => TResult): TResult[];
  remove(element: T): number;
  findMissingElements<T>(second: T[]): T[];
}

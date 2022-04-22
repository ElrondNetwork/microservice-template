Number.prototype.toRounded = function (digits: number): number {
  return parseFloat(this.toFixed(digits));
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare interface Number {
  toRounded(digits: number): number;
}

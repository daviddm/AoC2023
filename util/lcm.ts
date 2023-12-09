import { gcd } from "./gcd";

export function lcm(a: number, b: number): number {
  return (a / gcd(a, b)) * b;
}

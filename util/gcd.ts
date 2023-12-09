export function gcd(a: number, b: number): number {
  var t = 0;
  a < b && ((t = b), (b = a), (a = t));
  t = a % b;
  return t ? gcd(b, t) : b;
}

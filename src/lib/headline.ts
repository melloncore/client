/** Big product headline: scales down for longer names so they never overflow. */
export function headlineSize(name: string, max = 7.5): string {
  const n = [...name].length;
  if (n <= 6) return `clamp(2.8rem,10vw,${max}rem)`;
  if (n <= 14) return "clamp(2.2rem,6vw,4.5rem)";
  return "clamp(1.8rem,4.2vw,3.4rem)";
}

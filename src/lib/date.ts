// Backend needs DD:MM:YYYY HH:mm:ss (e.g., 25:8:2025 11:39:23)
export function toBackendDateTime(input: Date | string): string {
  const d = typeof input === "string" ? new Date(input) : input;
  const day = d.getDate(), month = d.getMonth() + 1, year = d.getFullYear();
  const hh = d.getHours(), mm = d.getMinutes(), ss = d.getSeconds();
  return `${day}:${month}:${year} ${hh}:${mm}:${ss}`;
}
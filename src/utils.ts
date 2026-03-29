export type ValueOf<T> = T[keyof T];

export function convertDateToString(date: number): string {
  const d = new Date(date);
  const year = d.getFullYear().toString();
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");

  return `${year}年${month}月${day}日`;
}

export type ValueOf<T> = T[keyof T];

export function convertDateToString(date: Date): string {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}年${month}月${day}日`;
}

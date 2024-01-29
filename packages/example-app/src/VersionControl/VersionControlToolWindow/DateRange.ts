export type DateRange = { from?: Date; to?: Date };
export const dateToString = (date: Date) => {
  return `${date.getMonth() + 1}/${date.getDate()}/${date
    .getFullYear()
    .toString()
    .slice(-2)}`;
};
export const dateRangeToString = (dateRange: DateRange): string => {
  if (dateRange.from && dateRange.to) {
    return `Between ${dateToString(dateRange.from)} and ${dateToString(
      dateRange.to
    )}`;
  }
  if (dateRange.from) {
    return `since ${dateToString(dateRange.from)}`;
  }
  if (dateRange.to) {
    return `until ${dateToString(dateRange.to)}`;
  }
  return "";
};

function isDateAvailable(start, end, date) {
  start = new Date(start).getTime();
  end = new Date(end).getTime() - 1;
  date = new Date(date).getTime();
  if (
    isAtSameDate(start, date) ||
    isAtSameDate(end, date) ||
    inBetweenPeriod(date, start, end)
  )
    return false;
  return true;
}

function isAtSameDate(date1, date2) {
  return date1 === date2;
}

function inBetweenPeriod(date, startDate, endDate) {
  return date > startDate && date < endDate;
}

module.exports = {
  isDateAvailable
};

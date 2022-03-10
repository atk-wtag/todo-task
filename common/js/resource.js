// compares no. of days between two dates
function compareDates(d1, d2) {
  const date1 = new Date(d1);
  const date2 = new Date(d2);

  return parseInt((date2 - date1) / 86400000);
}

// date of today (yyyy-mm-dd)
function getCurrDate() {
  return new Date().toISOString().slice(0, 10);
}

// sanitizes inputs
function sanitizeString(str) {
  str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, " ");
  return str.trim();
}

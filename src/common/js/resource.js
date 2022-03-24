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
  const cannotStartWithChars = new RegExp(/[^a-z0-9(\r\n|\r|\n) .,/-]/gim);
  const oneOrMoreNewLines = new RegExp(/(\r\n|\r|\n)(\r\n|\r|\n)+/gm);
  const oneOrMoreWhiteSpaces = new RegExp(/ss+/gm);

  str = str.replace(cannotStartWithChars, " ");
  str = str.replace(oneOrMoreNewLines, "\n");
  str = str.replace(oneOrMoreWhiteSpaces, " ").trim();

  if (str.length > 0) return str;
  else return undefined;
}

function showToast(error) {
  let text;

  if (error === true) {
    text = "Failed. An Error Occurred";
    toast.className = "show-err";
  } else if (error === false) {
    text = `${getTickMark()} Successful`;

    toast.className = "show-no-err";
  }
  toast.innerHTML = text;

  setTimeout(function () {
    toast.className = toast.className.replace("show", "");
  }, 1500);
}

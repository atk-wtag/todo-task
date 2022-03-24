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
  const replaceSpecialChars = new RegExp(/[^a-z0-9(\r\n|\r|\n) .,-]/gim);
  const replaceWhiteSpaces = new RegExp(/ss+/g);

  str = str.replace(replaceSpecialChars, " ");
  str = str.replace(replaceWhiteSpaces, " ").trim();

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

function entryToJson(entry) {
  const difference = parseFloat(entry.getElementsByTagName('d:BC_30YEAR')[0].textContent) -
     parseFloat(entry.getElementsByTagName('d:BC_3MONTH')[0].textContent);

  return {
    "date": new Date(entry.getElementsByTagName('d:NEW_DATE')[0].textContent),
    "diff": difference
  }
}

function displayText(entry) {
  const displayText = (entry.diff <= 0) ? "Yes" : "Not Yet";
  document.getElementById('boldText').innerHTML = displayText;
}

function parseResponse(xml) {
  const entries = [...xml.getElementsByTagName("entry")].slice(-30).map(entryToJson);
  displayText(entries[entries.length - 1]);
}

const curveUri = "https://xn440i8qje.execute-api.us-east-1.amazonaws.com/master/retrieveYieldCurve";

jQuery.get(curveUri, parseResponse);

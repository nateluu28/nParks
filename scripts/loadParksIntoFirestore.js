const fs = require("fs");
const axios = require("axios");

async function getParksInState(stateCode, resultsPerPage, page, fields = []) {
  var address =
    "https://developer.nps.gov/api/v1/parks?api_key=XHpS7fKCjdUuTrvKD3tHCuP3rxmKh2cJryQzg23b" +
    "&stateCode=" +
    stateCode +
    "&limit=" +
    resultsPerPage;

  if (page) {
    address += "&start=" + (page * resultsPerPage + 1);
  }

  if (fields) {
    address += "&fields=" + fields.join(",");
  }

  try {
    const results = await axios.get(address);
    const parks = {};

    results.data.data.forEach(parkData => {
      parks[`${parkData["parkCode"]}`] = { ...parkData };
    });

    return parks;
  } catch (err) {
    console.error(err);
  }
}

const States = {
  Alabama: "AL",
  Alaska: "AK",
  American_Samoa: "AS",
  Arizona: "AZ",
  Arkansas: "AR",
  California: "CA",
  Colorado: "CO",
  Connecticut: "CT",
  Delaware: "DE",
  District_Of_Columbia: "DC",
  Federated_States_Of_Micronesia: "FM",
  Florida: "FL",
  Georgia: "GA",
  Guam: "GU",
  Hawaii: "HI",
  Idaho: "ID",
  Illinois: "IL",
  Indiana: "IN",
  Iowa: "IA",
  Kansas: "KS",
  Kentucky: "KY",
  Louisiana: "LA",
  Maine: "ME",
  Marshall_Islands: "MH",
  Maryland: "MD",
  Massachusetts: "MA",
  Michigan: "MI",
  Minnesota: "MN",
  Mississippi: "MS",
  Missouri: "MO",
  Montana: "MT",
  Nebraska: "NE",
  Nevada: "NV",
  New_Hampshire: "NH",
  New_Jersey: "NJ",
  New_Mexico: "NM",
  New_York: "NY",
  North_Carolina: "NC",
  North_Dakota: "ND",
  Northern_Mariana_Islands: "MP",
  Ohio: "OH",
  Oklahoma: "OK",
  Oregon: "OR",
  Palau: "PW",
  Pennsylvania: "PA",
  Puerto_Rico: "PR",
  Rhode_Island: "RI",
  South_Carolina: "SC",
  South_Dakota: "SD",
  Tennessee: "TN",
  Texas: "TX",
  Utah: "UT",
  Vermont: "VT",
  Virgin_Islands: "VI",
  Virginia: "VA",
  Washington: "WA",
  West_Virginia: "WV",
  Wisconsin: "WI",
  Wyoming: "WY"
};

// const stateCodes = ["CA", "CO", "ID"];
const stateCodes = Object.keys(States).map(stateName => {
  return States[stateName];
});

const fields = ["images"];
const chunkSize = 50;

const getAllParksInState = async stateCode => {
  var parks = {};
  var currentPage = 0;
  while (true) {
    const fetchedParks = await getParksInState(
      stateCode,
      chunkSize,
      currentPage,
      fields
    );

    Object.keys(fetchedParks).forEach(parkCode => {
      parks[parkCode] = fetchedParks[parkCode];
    });

    if (Object.keys(fetchedParks).length < chunkSize) {
      console.log(
        `${stateCode} : ${Object.keys(fetchedParks).length -
          chunkSize} : ${parks}`
      );
      break;
    } else {
      currentPage += 1;
    }
  }

  return parks;
};

const getAllParks = async () => {
  var parks = {};
  var currentStateCode = 0;
  // Grab the parks from each state
  while (true) {
    const fetchedParks = await getAllParksInState(stateCodes[currentStateCode]);

    Object.keys(fetchedParks).forEach(parkCode => {
      parks[parkCode] = fetchedParks[parkCode];
    });

    if (stateCodes[currentStateCode + 1]) {
      currentStateCode += 1;
    } else {
      break;
    }
  }

  return parks;
};

getAllParks().then(allParks => {
  console.log(`Fetched ${Object.keys(allParks).length} parks`);

  let data = JSON.stringify(allParks, null, 2);
  fs.writeFileSync("parks.json", data);
});

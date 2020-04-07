import axios from "axios";
import firestore from "@react-native-firebase/firestore";

import {
  GeoCollectionReference,
  GeoFirestore,
  GeoQuery,
  GeoQuerySnapshot,
} from "geofirestore";

export function processLatLong(latlong) {
  const splitString = latlong.split(",");
  return {
    lat: splitString[0].replace("lat:", ""),
    long: splitString[1].replace("long:", ""),
  };
}

/*
{ exists: true,
  id: '1eF67U8wRiZsx51uIPyn',
  data: [Function: data],
  distance: 330.9749473219239 },
{ exists: true,
  id: 'LHdSJ6wRFzLnH6KZkTBA',
  data: [Function: data],
  distance: 330.92385964732864 },
{ exists: true,
  id: 'yN5sKvUmZOpK0OGeZnJg',
  data: [Function: data],
  distance: 330.6878787421865 },
{ exists: true,
  id: '5xvuYxUlpBdFH4R3MP4f',
  data: [Function: data],
  distance: 334.9017109681746 },
{ exists: true,
  id: 'nq68bLU6zikmmorK6ILi',
  data: [Function: data],
  distance: 334.80232765655563 },
{ exists: true,
  id: 'JF4pNhlZh6IWpXez6W00',
  data: [Function: data],
  distance: 330.94416864703936 },
{ exists: true,
  id: 'GsyWzLdidiUhHG1WvZ4c',
  data: [Function: data],
  distance: 329.88601805424355 },
{ exists: true,
  id: '7oL5MlU641HnIOHeqCu3',
  data: [Function: data],
  distance: 332.49525996841203 },
{ exists: true,
  id: 'pUGBRZ5u8LBNTUHyOc7e',
  data: [Function: data],
  distance: 331.7838091667597 },
{ exists: true,
  id: 'WyAYDifhsKjmXIaCBSy7',
  data: [Function: data],
  distance: 330.1936282652271 },
{ exists: true,
  id: 'P7l6yqngTb0DxV6P0H6Z',
  data: [Function: data],
  distance: 328.4099387057509 },
*/

export function compareValues(key, order = "asc") {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
}

export async function getNearbyParks({ lat, long, distance }) {
  const geofirestore = new GeoFirestore(firestore());
  const geocollection = geofirestore.collection("parks");

  const query = geocollection.near({
    center: new firestore.GeoPoint(lat, long),
    radius: distance,
  });

  // Get query (as Promise)
  const parks = await query.get();

  // Sort the results by distance
  const parkDocs = parks.docs;

  parkDocs.sort(compareValues("distance"));

  return parkDocs;
}

/*
Given the 'stateCode' make a request to the NPS API and 
fetch ‘resultsPerPage’ number of parks from page ‘page’.
Returns an array of park objects
*/
export async function getParksInState(
  stateCode,
  resultsPerPage,
  page,
  fields = []
) {
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
    return results.data.data;
  } catch (err) {
    console.error(err);
  }
}

/*
Given the 'parkCode' make a request to the NPS API for all 
the fields contained within ‘fields’.
Returns an array of park objects with the default fields and
the requested fields
*/
export async function getParkDetails(parkCode, fields) {
  var address =
    "https://developer.nps.gov/api/v1/parks?api_key=XHpS7fKCjdUuTrvKD3tHCuP3rxmKh2cJryQzg23b" +
    "&parkCode=" +
    parkCode;

  if (fields) {
    address += "&fields=" + fields.join(",");
  }
  try {
    const results = await axios.get(address);
    return results.data.data[0];
  } catch (err) {
    console.error(err);
  }
}

/*
Given the 'parkCodes' make a request to the NPS API for all 
the fields contained within ‘fields’ for 'resultsPerPage' number
of parks from page 'page'.
Returns an array of park objects with the default fields and
the requested fields
*/
export function getParksDetails(parkCodes, fields, resultsPerPage, page) {
  var address =
    "https://developer.nps.gov/api/v1/parks?api_key=XHpS7fKCjdUuTrvKD3tHCuP3rxmKh2cJryQzg23b" +
    "&limit=" +
    resultsPerPage +
    "&start=" +
    (page - 1) * resultsPerPage;
  address += "&fields=" + fields.join(",");
  address += "&parkCode=" + parkCodes.join(",");
  axios.get(address).then((response) => {
    return response.data.data;
  });
}

/*
Given the 'parkCode' make a request to the NPS API for
the most recent news with the fields requested in 'fields'.
*/
export function getParkNews(parkCode, fields) {
  var address =
    "https://developer.nps.gov/api/v1/newsreleases?api_key=XHpS7fKCjdUuTrvKD3tHCuP3rxmKh2cJryQzg23b" +
    "&limit=1" +
    "&parkCode=" +
    parkCode;
  address += "&fields=" + fields.join(",");
  axios.get(address).then((response) => {
    return response.data.data;
  });
}

/*
Same as GetParkNews but for multiple parks.
Do not call GetParkNews multiple times!
The NPS API supports getting data for multiple parks.
Don’t forget to implement paging!
*/
export function getParksNews(parkCodes, fields, resultsPerPage, page) {
  var address =
    "https://developer.nps.gov/api/v1/newsreleases?api_key=XHpS7fKCjdUuTrvKD3tHCuP3rxmKh2cJryQzg23b" +
    "&limit=" +
    resultsPerPage +
    "&start=" +
    (page - 1) * resultsPerPage;
  address += "&fields=" + fields.join(",");
  address += "&parkCode=" + parkCodes.join(",");
  axios.get(address).then((response) => {
    return response.data.data;
  });
}

/*
Given the 'parkCode' make a request to the NPS API for
the most recent event with the fields requested in 'fields'.
*/
export function getParkEvent(parkCode, fields) {
  var address =
    "https://developer.nps.gov/api/v1/events?api_key=XHpS7fKCjdUuTrvKD3tHCuP3rxmKh2cJryQzg23b" +
    "&limit=1" +
    "&parkCode=" +
    parkCode;
  address += "&fields=" + fields.join(",");
  axios.get(address).then((response) => {
    return response.data.data;
  });
}

export function getParksEvents(parkCodes, fields, resultsPerPage, page) {
  var address =
    "https://developer.nps.gov/api/v1/events?api_key=XHpS7fKCjdUuTrvKD3tHCuP3rxmKh2cJryQzg23b" +
    "&limit=" +
    resultsPerPage +
    "&start=" +
    (page - 1) * resultsPerPage;
  address += "&fields=" + fields.join(",");
  address += "&parkCode=" + parkCodes.join(",");
  axios.get(address).then((response) => {
    return response.data.data;
  });
}

/*
Given the 'parkCode' make a request to the NPS API for
the most recent alert with the fields requested in 'fields'.
*/
export async function getParkAlerts(parkCode) {
  var address =
    "https://developer.nps.gov/api/v1/alerts?api_key=XHpS7fKCjdUuTrvKD3tHCuP3rxmKh2cJryQzg23b" +
    "&parkCode=" +
    parkCode;

  try {
    const results = await axios.get(address);
    return results.data;
  } catch (err) {
    console.error(err);
  }
}

export function getParksAlerts(parkCodes, fields, resultsPerPage, page) {
  var address =
    "https://developer.nps.gov/api/v1/alerts?api_key=XHpS7fKCjdUuTrvKD3tHCuP3rxmKh2cJryQzg23b" +
    "&limit=" +
    resultsPerPage +
    "&start=" +
    (page - 1) * resultsPerPage;
  address += "&fields=" + fields.join(",");
  address += "&parkCode=" + parkCodes.join(",");
  axios.get(address).then((response) => {
    return response.data.data;
  });
}

/*
Given the 'parkCode' make a request to the NPS API for
Visitor Centers with the fields requested in 'fields'.
*/
export function getVisitorCenter(parkCode, fields) {
  var address =
    "https://developer.nps.gov/api/v1/visitorcenters?api_key=XHpS7fKCjdUuTrvKD3tHCuP3rxmKh2cJryQzg23b" +
    "&parkCode=" +
    parkCode;
  address += "&fields=" + fields.join(",");
  axios.get(address).then((response) => {
    return response.data.data;
  });
}

export function getVisitorCenters(parkCodes, fields, resultsPerPage, page) {
  var address =
    "https://developer.nps.gov/api/v1/visitorcenters?api_key=XHpS7fKCjdUuTrvKD3tHCuP3rxmKh2cJryQzg23b" +
    "&limit=" +
    resultsPerPage +
    "&start=" +
    (page - 1) * resultsPerPage;
  address += "&fields=" + fields.join(",");
  address += "&parkCode=" + parkCodes.join(",");
  axios.get(address).then((response) => {
    return response.data.data;
  });
}

/*
Given the 'parkCode' make a request to the NPS API for
places with the fields requested in 'fields'.
*/
export function getPlace(parkCode, fields) {
  var address =
    "https://developer.nps.gov/api/v1/places?api_key=XHpS7fKCjdUuTrvKD3tHCuP3rxmKh2cJryQzg23b" +
    "&parkCode=" +
    parkCode;
  address += "&fields=" + fields.join(",");
  axios.get(address).then((response) => {
    return response.data.data;
  });
}

export function getPlaces(parkCodes, fields, resultsPerPage, page) {
  var address =
    "https://developer.nps.gov/api/v1/places?api_key=XHpS7fKCjdUuTrvKD3tHCuP3rxmKh2cJryQzg23b" +
    "&limit=" +
    resultsPerPage +
    "&start=" +
    (page - 1) * resultsPerPage;
  address += "&fields=" + fields.join(",");
  address += "&parkCode=" + parkCodes.join(",");
  axios.get(address).then((response) => {
    return response.data.data;
  });
}

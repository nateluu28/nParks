// import axios from "axios";
const axios = require("axios");
function getParkDetails(parkCode, fields) {
  var address =
    "https://developer.nps.gov/api/v1/parks?api_key=XHpS7fKCjdUuTrvKD3tHCuP3rxmKh2cJryQzg23b" +
    "&parkCode=" +
    parkCode;
  address += "&fields=" + fields.join(",");
  axios.get(address).then(response => {
    return response.data.data;
  });
}

console.log(getParkDetails("yell", []));

/*
Given the 'stateCode' make a request to the NPS API and 
fetch ‘resultsPerPage’ number of parks from page ‘page’.
Returns an array of park objects
*/
export function getParksInState(stateCode, resultsPerPage, page) {
    var address = 'https://developer.nps.gov/api/v1/parks?api_key=XHpS7fKCjdUuTrvKD3tHCuP3rxmKh2cJryQzg23b'
        + '&stateCode=' + stateCode
        + '&limit=' + resultsPerPage
        + '&start=' + (page-1)*resultsPerPage;
    axios.get(address).then(response => {
        return response.data.data;
    }).catch(error => console.error(error));
}

/*
Given the 'parkCode' make a request to the NPS API for all 
the fields contained within ‘fields’.
Returns an array of park objects with the default fields and
the requested fields
*/
export function getParkDetails(parkCode, fields) {
    var address = 'https://developer.nps.gov/api/v1/parks?api_key=XHpS7fKCjdUuTrvKD3tHCuP3rxmKh2cJryQzg23b'
        + '&parkCode=' + parkCode;
    address += "&fields=" + fields.join(",");
    axios.get(address).then(response => {
        return response.data.data;
    })
}

/*
Given the 'parkCodes' make a request to the NPS API for all 
the fields contained within ‘fields’ for 'resultsPerPage' number
of parks from page 'page'.
Returns an array of park objects with the default fields and
the requested fields
*/
export function getParksDetails(parkCodes, fields, resultsPerPage, page) {
    var address = 'https://developer.nps.gov/api/v1/parks?api_key=XHpS7fKCjdUuTrvKD3tHCuP3rxmKh2cJryQzg23b'
        + '&limit=' + resultsPerPage
        + '&start=' + (page-1)*resultsPerPage;
    address += "&fields=" + fields.join(",");
    address += "&parkCode=" + parkCodes.join(",");
    axios.get(address).then(response => {
        return response.data.data;
    })
}

/*
Given the 'parkCode' make a request to the NPS API for
the most recent news with the fields requested in 'fields'.
*/
export function getParkNews(parkCode, fields) {
    var address = 'https://developer.nps.gov/api/v1/newsreleases?api_key=XHpS7fKCjdUuTrvKD3tHCuP3rxmKh2cJryQzg23b'
        + '&limit=1'
        + '&parkCode=' + parkCode;
    address += "&fields=" + fields.join(",");
    axios.get(address).then(response => {
        return response.data.data;
    })
}

/*
Same as GetParkNews but for multiple parks.
Do not call GetParkNews multiple times!
The NPS API supports getting data for multiple parks.
Don’t forget to implement paging!
*/
export function getParksNews(parkCodes, fields, resultsPerPage, page) {
    var address = 'https://developer.nps.gov/api/v1/newsreleases?api_key=XHpS7fKCjdUuTrvKD3tHCuP3rxmKh2cJryQzg23b'
        + '&limit=' + resultsPerPage
        + '&start=' + (page-1)*resultsPerPage;
    address += "&fields=" + fields.join(",");
    address += "&parkCode=" + parkCodes.join(",");
    axios.get(address).then(response => {
        return response.data.data;
    })
}

/*
Given the 'parkCode' make a request to the NPS API for
the most recent event with the fields requested in 'fields'.
*/
export function getParkEvent(parkCode, fields) {
    var address = 'https://developer.nps.gov/api/v1/events?api_key=XHpS7fKCjdUuTrvKD3tHCuP3rxmKh2cJryQzg23b'
        + '&limit=1'
        + '&parkCode=' + parkCode;
    address += "&fields=" + fields.join(",");
    axios.get(address).then(response => {
        return response.data.data;
    })
}

export function getParksEvents(parkCodes, fields, resultsPerPage, page) {
    var address = 'https://developer.nps.gov/api/v1/events?api_key=XHpS7fKCjdUuTrvKD3tHCuP3rxmKh2cJryQzg23b'
        + '&limit=' + resultsPerPage + '&start=' + (page-1)*resultsPerPage;
    address += "&fields=" + fields.join(",");
    address += "&parkCode=" + parkCodes.join(",");
    axios.get(address).then(response => {
        return response.data.data;
    })
}

/*
Given the 'parkCode' make a request to the NPS API for
the most recent alert with the fields requested in 'fields'.
*/
export function getParkAlert(parkCode, fields) {
    var address = 'https://developer.nps.gov/api/v1/alerts?api_key=XHpS7fKCjdUuTrvKD3tHCuP3rxmKh2cJryQzg23b'
        + '&limit=1'
        + '&parkCode=' + parkCode;
    address += "&fields=" + fields.join(",");
    axios.get(address).then(response => {
        return response.data.data;
    })
}

export function getParksAlerts(parkCodes, fields, resultsPerPage, page) {
    var address = 'https://developer.nps.gov/api/v1/alerts?api_key=XHpS7fKCjdUuTrvKD3tHCuP3rxmKh2cJryQzg23b'
        + '&limit=' + resultsPerPage + '&start=' + (page-1)*resultsPerPage;
    address += "&fields=" + fields.join(",");
    address += "&parkCode=" + parkCodes.join(",");
    axios.get(address).then(response => {
        return response.data.data;
    })
}

/*
Given the 'parkCode' make a request to the NPS API for
Visitor Centers with the fields requested in 'fields'.
*/
export function getVisitorCenter(parkCode, fields) {
    var address = 'https://developer.nps.gov/api/v1/visitorcenters?api_key=XHpS7fKCjdUuTrvKD3tHCuP3rxmKh2cJryQzg23b'
        + '&parkCode=' + parkCode;
    address += "&fields=" + fields.join(",");
    axios.get(address).then(response => {
        return response.data.data;
    })
}

export function getVisitorCenters(parkCodes, fields, resultsPerPage, page) {
    var address = 'https://developer.nps.gov/api/v1/visitorcenters?api_key=XHpS7fKCjdUuTrvKD3tHCuP3rxmKh2cJryQzg23b'
        + '&limit=' + resultsPerPage
        + '&start=' + (page-1)*resultsPerPage;
    address += "&fields=" + fields.join(",");
    address += "&parkCode=" + parkCodes.join(",");
    axios.get(address).then(response => {
        return response.data.data;
    })
}

/*
Given the 'parkCode' make a request to the NPS API for
places with the fields requested in 'fields'.
*/
export function getPlace(parkCode, fields) {
    var address = 'https://developer.nps.gov/api/v1/places?api_key=XHpS7fKCjdUuTrvKD3tHCuP3rxmKh2cJryQzg23b'
        + '&parkCode=' + parkCode;
    address += "&fields=" + fields.join(",");
    axios.get(address).then(response => {
        return response.data.data;
    })
}

export function getPlaces(parkCodes, fields, resultsPerPage, page) {
    var address = 'https://developer.nps.gov/api/v1/places?api_key=XHpS7fKCjdUuTrvKD3tHCuP3rxmKh2cJryQzg23b'
        + '&limit=' + resultsPerPage
        + '&start=' + (page-1)*resultsPerPage;
    address += "&fields=" + fields.join(",");
    address += "&parkCode=" + parkCodes.join(",");
    axios.get(address).then(response => {
        return response.data.data;
    })
}
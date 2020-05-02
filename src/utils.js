const defaultCityId = 1283240;
const kelvinBase = 273.15;
const appId = 'ff5d084541aac5b27ef0f46c449da8ca'

const getDataForCity = async (cityId = defaultCityId) => {
  const url = `http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${appId}`;
  const response = await fetch(url);
  if (response.status === 200) {
    const responseJson = await response.json();
    return responseJson;
  }
//   return null;
};

function toDegreesMinutesAndSeconds(coordinate) {
  var absolute = Math.abs(coordinate);
  var degrees = Math.floor(absolute);
  var minutesNotTruncated = (absolute - degrees) * 60;
  var minutes = Math.floor(minutesNotTruncated);
  var seconds = Math.floor((minutesNotTruncated - minutes) * 60);

  return degrees + " " + minutes + " " + seconds;
}

function convertDMS(lat, lng) {
  var latitude = toDegreesMinutesAndSeconds(lat);
  var latitudeCardinal = lat >= 0 ? "N" : "S";

  var longitude = toDegreesMinutesAndSeconds(lng);
  var longitudeCardinal = lng >= 0 ? "E" : "W";

  return (
    latitude +
    " " +
    latitudeCardinal +
    "\n" +
    longitude +
    " " +
    longitudeCardinal
  );
}

export { kelvinBase, getDataForCity, convertDMS };

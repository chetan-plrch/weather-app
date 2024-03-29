const defaultCityId = 1283240;
const kelvinBase = 273.15;
const appId = "d80352b92df55588f82aeb1c904351dc";
const maxRelevantResults = 25

const getDataForCity = async (cityId = defaultCityId) => {
  const url = `http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${appId}`;
  const response = await fetch(url);
  if (response.status === 200) {
    const responseJson = await response.json();
    return responseJson;
  }
  return null;
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

const getMatches = (cities, searchText) => {
  const filtered = []

  cities.forEach((city) => {
    const index = city?.name?.toLowerCase()?.indexOf(searchText?.toLowerCase());
    if (index !== -1) {
      if (filtered[index]) {
        filtered[index].push(city);
      } else {
        filtered[index] = [];
        filtered[index].push(city);
      }
    }
  });

  return filtered.reduce((acc, cur) => {
    if (cur) {
      return [...acc, ...cur];
    }
    return acc;
  }, []).slice(0, maxRelevantResults);
};

export { kelvinBase, getDataForCity, convertDMS, getMatches };

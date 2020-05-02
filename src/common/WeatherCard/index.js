import React from "react";
import { kelvinBase, convertDMS } from "../../utils";
import humidityImage from "../../images/humidity.png";
import windImage from "../../images/wind.png";
import sunnyImage from "../../images/sunny.png";
import cloudyImage from "../../images/cloudy.png";
import rainImage from "../../images/rain.png";
import snowImage from "../../images/snow.png";
import "../../css/Card.css";

const imageSet = {
  rain: rainImage,
  clouds: cloudyImage,
  sunny: sunnyImage,
  snow: snowImage,
};

const WeatherCard = ({
  name,
  country,
  lat,
  long,
  date,
  windSpeed,
  humidity,
  temp,
  tempType,
  description,
  loading,
}) => {
  if (loading) {
    return (
      <div className="Weather-card-loader">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="Weather-card">
      <div className="Weather-content">
        <div className="Card-name">{name}</div>
        <div className="Card-country">{country}</div>
        <div className="Card-lat-long">{convertDMS(lat, long)}</div>
        <div className="Card-date">{new Date(date).toString()}</div>
        <div className="Card-flow">
          <div className="Margin-right">
            <img
              src={windImage}
              className="Card-humidity-image"
              alt="windSpeed"
            />
            <div className="Card-humidity">{`${windSpeed} m/s`}</div>
          </div>
          <div className="Margin-left">
            <img
              src={humidityImage}
              className="Card-humidity-image"
              alt="humidityLevel"
            />
            <div className="Card-humidity">{`${humidity}%`}</div>
          </div>
        </div>
        <div className="Card-flow">
          <div className="Card-temperature-block">
            <div>{`${Math.round(temp - kelvinBase)}°C`}</div>
            <div className="Card-temp">{tempType}</div>
          </div>
        </div>
        <div className="Card-description">{description}</div>
      </div>
      {imageSet[tempType?.toLowerCase()] ? (
        <img
          src={imageSet[tempType?.toLowerCase()]}
          className="Card-top-image"
          alt="weather"
        />
      ) : null}
    </div>
  );
};

export default WeatherCard;

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
  const day = new Date(date).toString();

  if (loading) {
    return (
      <div className="Weather-card-loader">
        <div className="spinner" />
      </div>
    );
  }

  const getWindElement = () => {
    if (windSpeed) {
      return (
        <div className="Margin-right">
          <img
            src={windImage}
            className="Card-humidity-image"
            alt="windSpeed"
          />
          <div className="Card-humidity">{`${windSpeed} m/s`}</div>
        </div>
      );
    }
    return null;
  };

  const getHumidityElement = () => {
    if (humidity) {
      return <div className="Margin-left">
        <img
          src={humidityImage}
          className="Card-humidity-image"
          alt="humidityLevel"
        />
        <div className="Card-humidity">{`${humidity}%`}</div>
      </div>;
    }
    return null;
  };

  const getImageElement = () => {
    if (imageSet[tempType?.toLowerCase()]) {
      return <img
        src={imageSet[tempType?.toLowerCase()]}
        className="Card-top-image"
        alt="weather"
      />;
    }
    return null;
  };

  return (
    <div className="Weather-card">
      <div className="Weather-content">
        <div className="Card-name">{name}</div>
        <div className="Card-country">{country}</div>
        <div className="Card-lat-long">{convertDMS(lat, long)}</div>
        <div className="Card-date">{day}</div>
        <div className="Card-flow">
          {getWindElement()}
          {getHumidityElement()}
        </div>
        <div className="Card-flow">
          <div className="Card-temperature-block">
            {temp && <div>{`${Math.round(temp - kelvinBase)}°C`}</div>}
            {tempType && <div className="Card-temp">{tempType}</div>}
          </div>
        </div>
        {description && <div className="Card-description">{description}</div>}
      </div>
      {getImageElement()}
    </div>
  );
};

export default WeatherCard;

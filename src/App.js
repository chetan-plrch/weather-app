import React, { useState, useEffect } from "react";
import { getDataForCity, getMatches } from "./utils";
import ListContainer from "./common/ListContainer";
import ListItem from "./common/ListItem";
import SearchBox from "./common/SearchBox";
import WeatherCard from "./common/WeatherCard";
import cities from "./data/daily.json";
import "./css/App.css";

const List = ({ items, showList, onClick, searchText }) => {
  const getListItems = () => {
    return items.map((item) => (
      <ListItem
        onClick={() => {
          onClick({ name: item?.name, id: item?.id });
        }}
        id={item?.id}
        name={item?.name}
        searchText={searchText}
        placeholder={searchText?.length < 1}
      />
    ));
  };

  if (showList && items?.length > 0) {
    return <ListContainer>{getListItems()}</ListContainer>;
  } else if (showList) {
    return (
      <ListContainer>
        <ListItem
          id={"search-no-results"}
          name={"No search results"}
          placeholder={true}
        />
      </ListContainer>
    );
  }
  return null;
};

function App() {
  const [searchText, setSearchText] = useState("");
  const [showList, setShowList] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const selectedCityId = selectedCity?.id;

  useEffect(() => {
    const setData = async () => {
      setLoading(true);
      setError(false);
      const cityData = await getDataForCity(selectedCityId);
      if (cityData) {
        setWeatherData(cityData);
      } else {
        setError(true);
      }
      setLoading(false);
    };

    setData();
  }, [selectedCityId]);

  const items = getMatches(cities, searchText);

  const handleInputEvent = (evt) => {
    if (evt.target.value) {
      setSearchText(evt.target.value);
      setShowList(true);
    } else {
      setSearchText("");
      setShowList(false);
    }
  };

  const onSearchFocus = () => {
    if (searchText !== "") {
      setShowList(true);
    }
  };

  const onSearchBlur = () => {
    setTimeout(() => setShowList(false), 200);
  };

  const onClick = (cityObj) => {
    setSelectedCity(cityObj || null);
    setSearchText(cityObj?.name || "");
    setShowList(false)
  };

  const getLoadingState = () => {
    return new Array(6).fill(0).map(() => {
      return <WeatherCard loading={true} />;
    });
  };

  const getWeatherList = () => {
    const weatherLoaded = weatherData?.list?.length > 0;
    if (weatherLoaded) {
      return weatherData.list.map((period) => {
        return (
          <WeatherCard
            loading={loading}
            name={weatherData?.city?.name}
            country={weatherData?.city?.country}
            lat={weatherData?.city?.coord?.lat}
            long={weatherData?.city?.coord?.lon}
            date={period?.dt}
            windSpeed={period?.wind?.speed}
            humidity={period?.main?.humidity}
            temp={period?.main?.temp}
            tempType={period?.weather[0]?.main}
            description={period?.weather[0]?.description}
          />
        );
      });
    }

    return getLoadingState();
  };

  const getElements = () => {
    if (error) {
      return (
        <div className="Cards-load-error">
          Oops! Could not load the data, Please try again after sometime
        </div>
      );
    }
    return <div className="Cards-list-responsive">{getWeatherList()}</div>;
  };

  return (
    <div className="Main-container">
      <SearchBox
        onBlur={onSearchBlur}
        onFocus={onSearchFocus}
        searchText={searchText}
        onChange={handleInputEvent}
      />
      <div className="List-relative">
        <List
          onClick={onClick}
          items={items}
          searchText={searchText}
          showList={showList}
        />
      </div>
      {getElements()}
    </div>
  );
}

export default App;

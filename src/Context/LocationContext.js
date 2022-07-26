import {createContext, useCallback, useEffect, useState} from "react";
import {getCurrentCountry} from "../Repository/BaseRequests";

const LocationContext = createContext({
  currentLocation: '',
  locations: [],
  toggleSelectCountry: (code) => {
  }

});

export function LocationContextProvider({children}) {
  const [locations, setLocations] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({});
  const locationSelected = localStorage.getItem('country');
  useEffect(() => {
    getCurrentCountry()
      .then(res => {
        setLocations(res.data.others);
        localStorage.setItem('country', `${JSON.stringify(res.data.current)}`);
        setCurrentLocation(locationSelected == null ? res.data.current : JSON.parse(locationSelected));
      })
      .catch(err => console.log(err));
  }, [locationSelected]);

  const toggleSelectCountry = useCallback((code) => {
    const item = locations.find(item => item.code === code);
    localStorage.setItem('country', JSON.stringify(item));
    setCurrentLocation(item);
  }, [locations]);

  const context = {
    currentLocation,
    locations,
    toggleSelectCountry
  }
  return (
    <LocationContext.Provider value={context}>
      {children}
    </LocationContext.Provider>
  )
}

export default LocationContext;
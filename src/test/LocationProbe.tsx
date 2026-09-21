import { useLocation } from "react-router-dom";

/** Rende visibile la rotta corrente per verificare le navigazioni nei test. */
const LocationProbe = () => {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
};

export default LocationProbe;

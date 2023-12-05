import cheackWeather from "./main.js";
const getMyLocation = () => {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const success = async (pos) => {
    const crd = pos.coords;

    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${crd.latitude}&lon=${crd.longitude}&apiKey=09c912d90d904578b28110161cbc9126`
    );

    const result = await response.json();

    const weather = await cheackWeather(result.features[0].properties.city); //we take only city
    // return weather;
  };

  const error = (err) => {
    console.log(err.code + " " + err.message);
  };

  navigator.geolocation.getCurrentPosition(success, error, options);
};

export default getMyLocation;

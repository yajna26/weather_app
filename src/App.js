import "./App.css";
import TopBottons from "./Components/TopBottons";
import Inputs from "./Components/Inputs";
import TimeAndLocation from "./Components/TimeAndLocation";
import TemperatureAndDetails from "./Components/TemperatureAndDetails";
import Forecast from "./Components/Forecast";
import getFormattedWeatherData from "./Services/WeatherService";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [query, setQuery] = useState({q: 'Bon Accueil'})
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q: 'current location.'

      toast.info('Fetching weather for ' + message)

      await getFormattedWeatherData({...query, units}).then(data => {
        toast.success(`Sucessfully fetched weather for ${data.name}, ${data.country}`)

        setWeather(data);
      });
    };
  
    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return 'from-cyan-700 to-blue-700'
    const threshold = units === 'metric' ? 20:60
    if (weather.temp <= threshold) return 'from-cyan-700 to-blue-700'
    return 'from-yellow-700 to-orange-700'
  }

  return (
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <TopBottons setQuery={setQuery}/>
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>

      {weather && (
        <div>
          <TimeAndLocation weather={weather}/>
          <TemperatureAndDetails weather={weather}/>
          <Forecast title="Hourly forecast" items={weather.hourly}/>
          <Forecast title="Daily forecast" items={weather.daily}/>
        </div>
      )}
      
      <ToastContainer autoClose={5000} theme='colored' newestOnTop={true}/>
    </div>
  );
}

export default App;
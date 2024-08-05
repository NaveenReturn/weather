import { useState } from 'react'
import './App.css'
// images

import searchIcon from "./assets/search.png";
import clearIcon from "./assets/clear.jpg";
import cloudhIcon from "./assets/cloud.png";
import drizzlehIcon from "./assets/drizzle.png";
import humidityIcon from "./assets/humidity.png";
import humidityIcon1 from "./assets/humidity-1.png";
import rainIcon from "./assets/rain.jpg";
import snowIcon from "./assets/snow.jpg";
import windIcon from "./assets/wind.png";
const WeatherDetails = ({icon,temp,city,country,lat,log,humidity,wind})=>{
   return(
    <>
    <div className='image'>
        <img src={icon} height={100} alt='vite'/>
    </div>
    <div className='temp'>
         {temp} °C
    </div>
    <div className='location'>{city} </div>
    <div className='country'>{country}</div>
    <div className='cord'>
       <div>
          <span className='lat'>latitude</span>
          <span>{lat}</span>
       </div>
       <div>
          <span className='log'>lonitude</span>
          <span>{log}</span>
       </div>
    </div>
    <div className='data-container'>
       <div className='element'>
         <img src={humidityIcon1} height={60} className='icon' alt='vite'/>
         <div className="data">
             <div className="humidity-parcent">{humidity} %</div>
             <div className="text">Humidity</div>
         </div>
       </div>
       <div className='element'>
         <img src={windIcon} height={60} className='icon' alt='vite'/>
         <div className="data">
             <div className="wind-parcent">{wind} km/h</div>
             <div className="text">Wind Speed</div>
         </div>
       </div>
    </div>
 </>
   )
}


function App() {
     const [text,setText] = useState("chennai")
     const [icon,setIcon] = useState(snowIcon);
     const [temp,setTemp] = useState(0);
     const [city,setCity] = useState("");
     const [country,setCountry] = useState("IN");
     const [lat,setLat] = useState(0);
     const [log,setLog] = useState(0);
     const [humidity,setHumidity] = useState(0);
     const [wind,setWind] = useState(0);
     const [error,setError] = useState(null);

     const [cityNotFound,setCitynotFount] = useState(false);
     const [loading,setLoading] = useState(false);

     const weatherIconMap = {
         "01d":clearIcon,
         "01n":clearIcon,
         "02d":cloudhIcon,
         "02n":cloudhIcon,
         "03d":drizzlehIcon,
         "03n":drizzlehIcon,
         "04d":drizzlehIcon,
         "04n":rainIcon,
         "09d":rainIcon,
         "09n":rainIcon,
         "10n":rainIcon,
         "13d":snowIcon,
         "13n":snowIcon
     }
    

     const search = async ()=>{
         setLoading(true)
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=2b78d21a48982130252c672ba476001d&units=Metric`
      try{
       let res = await fetch(url);
       let data = await res.json();

       if(data.cod === "404"){
          console.error("city not Found")
          setCitynotFount(true);
          setLoading(false);
          return;
       }

       setHumidity(data.main.humidity);
       setWind(data.wind.speed);
       setTemp(Math.floor(data.main.temp));
       setCity(data.name);
       setCountry(data.sys.country);
       setLat(data.coord.lat);
       setLog(data.coord.lon);
       const weatherIconCode = data.weather[0].icon;
        setIcon(weatherIconMap[weatherIconCode] || clearIcon);
        setCitynotFount(false)
      }catch(error){
          console.error("AN error occurred:",error.message)
          setError("An error occurred while fetching weather data.");
      }finally{
          setLoading(false)
      }
   }    

   const handleCity = (e)=>{
        setText(e.target.value)
   }

   const handleKetDown = (e)=>{
      if(e.key === "Enter"){
          search()
      }
   }
  return (
    <>
      <div className='container'>
         <header>
             <h1>Naveen</h1> 
         </header>
           <div className='input-container'>
               <input  type='text'
                className='cityInput'
                placeholder='Search City'
                name='city'
                onChange={handleCity}
                value={text}
                onKeyDown={handleKetDown}
               />
               <div>
                  <img src={searchIcon} height={25} alt='vite'
                    onClick={()=>search()}
                  />
               </div>
           </div>
           {!loading&& !cityNotFound && <WeatherDetails icon={icon} 
           temp={temp} city={city} 
           country={country} 
           lat={lat}
           log={log}
            humidity={humidity}
            wind={wind}
           />}

           {loading&&<div className="loading-message">Loading....</div>}
           {error && <div className="error-message">{error}</div>}
           {cityNotFound && <div className="city-not-found">City Not Found</div>}
      </div>
    </>
  )
}

export default App

const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time')
const icon = document.querySelector('.icon img')
const invalid = document.querySelector('.invalid')

const updateUI = (data) =>{
   const cityDets = data.cityDets;
   const  weather = data.weather;
    details.innerHTML=`
    <h5 class="my-5">${cityDets.EnglishName}</h5>
    <div class="my-5">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `
    
let timeSrc=null;
if(weather.IsDayTime){
    timeSrc='icons/morning.png';
}
else{
    timeSrc='icons/night.png';
}
let iconSrc=null;
iconSrc=`icons/${weather.WeatherIcon}.svg`;
icon.setAttribute('src',iconSrc)

time.setAttribute('src',timeSrc)
    if (card.classList.contains('d-none')){
        card.classList.remove('d-none')
    }

} ;

cityForm.addEventListener('submit', e => {
    // prevent default action
    e.preventDefault();
    
    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();
  
    // update the ui with new city
    updateCity(city)
      .then(data => updateUI(data))
      .catch(err => console.log(err));
  });


const updateCity = async (city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);
    return { cityDets, weather };
  
  };

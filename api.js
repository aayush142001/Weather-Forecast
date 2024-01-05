const weatherApi={
    key:"79ad53bbcd0107c4ba6fea02ffae5c32",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}


const searchInputBox=document.getElementById('box');
searchInputBox.addEventListener('keypress',(event)=>{
    if(event.key=="Enter" && searchInputBox.value!=""){
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
    }
});

// Get Weather Report
async function getWeatherReport(city) {

    const response = await fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`);
    if(response.status==404){
        document.querySelector('.error').style.display="block";
        document.querySelector('.weather-body').style.display="none";
        
    }else{
        fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);

    document.querySelector('.error').style.display="none";
    document.querySelector('.weather-body').style.display="block";
    

    }
    

    
}
    


const weatherIcon=document.querySelector(".weather-icon");

 // Show Weather Report

async function showWeatherReport(weather){
        // console.log(weather);
    let city = document.getElementById('city');
        city.innerText = `${weather.name}, ${weather.sys.country}`;
    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;
    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C [min] / ${Math.ceil(weather.main.temp_max)}&deg;C [max] `;
    let weatherType = document.getElementById('weather');
        weatherType.innerText = `${weather.weather[0].main}`;
    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);
    if(weatherType.textContent == 'Clear') {
       weatherIcon.src = "images/clear.png";
    } else if(weatherType.textContent == 'Clouds') {
        weatherIcon.src = "images/clouds.png";
    } else if(weatherType.textContent == 'Rain') {
        weatherIcon.src = "images/rain.png";
    } else if(weatherType.textContent == 'Snow') {
        weatherIcon.src = "images/snow.png";
    } else if(weatherType.textContent == 'Mist') {
        weatherIcon.src = "images/mist.png";
    } else if(weatherType.textContent == 'Drizzle') {
        weatherIcon.src = "images/drizzle.png";
    } 
    

    
}

 //date

function dateManage(dateArg) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "Febru ary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];
    return `${date} ${month},${year} (${day})`;

}

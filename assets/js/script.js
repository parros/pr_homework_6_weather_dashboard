const cityCurrent = $('#cityCurrent')
const previousSearch = $('#previousSearch')
const searchSubmit = $('#searchSubmit')
const searchCity = $('#searchCity')
const day1 = $('#day1')
const day2 = $('#day1')
const day3 = $('#day1')
const day4 = $('#day1')
const day5 = $('#day1')

console.log(dayjs().format())
// Search city info through API
function searchInfo(event) {
    event.preventDefault()
    const cityName = searchCity.val()
    cityCurrent.empty()
    cityCurrent.append(cityName)
    console.log(cityName)
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=09f5fc783fda185655df2bae2ca3196b`)
    .then(function(response){
        return response.json()
    })
    .then(function(json) {
        const lat = json[0].lat
        const lon = json[0].lon
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=09f5fc783fda185655df2bae2ca3196b`)
        .then(function(response){
            return response.json()
        })
        .then(function(json){
            console.log(json.list)
            const time = json.list[0].dt * 1000
            const currentDate = new Date(time)
            const currentMonth = currentDate.getMonth() + 1
            const currentDay = currentDate.getDate()
            const currentYear = currentDate.getFullYear()
            cityCurrent.append(` (${currentMonth}/${currentDay}/${currentYear})`)
            console.log(json.list[0].wind.speed)
            const currentWind = json.list[0].wind.speed
            const tempInK = json.list[0].main.temp
            tempInF = (tempInK-273.15)*1.8+32
            const currentTemp = tempInF.toFixed(2)
            console.log(currentTemp)
            const currentHumid = json.list[0].main.humidity
            console.log(json.list[0].main.humidity)
            console.log(json.list[0].weather[0].icon)
            const currentIcon = json.list[0].weather[0].icon
            const newIcon = $(`<img height='56' width='56' src="https://openweathermap.org/img/wn/${currentIcon}@2x.png">`)
            console.log(cityCurrent)
            console.log(newIcon)
            cityCurrent.append(newIcon)
            console.log(cityCurrent)
        })
    })
}

$(document).ready(function () {
searchSubmit.on('click', searchInfo)
})






// fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchInfo()}&limit=1&appid=09f5fc783fda185655df2bae2ca3196b`)
//     .then(function(response){
//         console.log(response)
//     })

// fetch('https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=09f5fc783fda185655df2bae2ca3196b')
//     .then(function(response){
//         console.log(response)
//     })

    
// fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchInfo()}&limit=1&appid=09f5fc783fda185655df2bae2ca3196b`)
//     .then(function(response){
//         console.log(response)
//     })
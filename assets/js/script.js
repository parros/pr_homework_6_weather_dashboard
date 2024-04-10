const cityCurrent = $('#cityCurrent')
const previousSearch = $('#previousSearch')
const searchSubmit = $('#searchSubmit')
const searchCity = $('#searchCity')
const day1 = $('#day1')
const day2 = $('#day1')
const day3 = $('#day1')
const day4 = $('#day1')
const day5 = $('#day1')

// Search city info through API
function searchInfo(event) {
    event.preventDefault()
    const cityName = searchCity.val()
    cityCurrent.empty()
    cityCurrent.append(cityName)
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
            // Current Time
            const time = json.list[0].dt * 1000
            const currentDate = new Date(time)
            console.log(currentDate)
            const currentMonth = currentDate.getMonth() + 1
            const currentDay = currentDate.getDate()
            const currentYear = currentDate.getFullYear()
            cityCurrent.append(` (${currentMonth}/${currentDay}/${currentYear})`)

            // Future Time
            for (let i = 8; i-1 <json.list.length; i= i+8){
                const futureTime = json.list[i-1].dt * 1000
                console.log(futureTime)
                const futureDate = new Date(futureTime)
                console.log(futureDate)
                const futureMonth = futureDate.getMonth() + 1
                const futureDay = futureDate.getDate()
                const futureYear = futureDate.getFullYear()
                $(`#day${i/8}Date`).append(`${futureMonth}/${futureDay}/${futureYear}`)
            }


            // Current Wind Speed
            const currentWindSpeed = json.list[0].wind.speed
            $('#currentWind').append(currentWindSpeed)

            // Future Wind Speed
            for (let i = 8; i-1 <json.list.length; i= i+8){
                const futureWindSpeed = json.list[i-1].wind.speed
                $(`#day${i/8}Wind`).append(futureWindSpeed)
            }

            // Current Temp
            const tempInK = json.list[0].main.temp
            const tempInF = (tempInK-273.15)*1.8+32
            const currentTemp = tempInF.toFixed(2)
            $('#currentTemp').append(currentTemp)

            for (let i = 8; i-1 <json.list.length; i= i+8){
                const futureTempInK = json.list[i-1].main.temp
                const futureTempInF = (futureTempInK-273.15)*1.8+32
                const futureTemp = futureTempInF.toFixed(2)
                $(`#day${i/8}Temp`).append(futureTemp)
            }

            // Current Humidity
            const currentHumid = json.list[0].main.humidity
            $('#currentHumid').append(currentHumid)

            // Future Humidity
            for (let i = 8; i-1 <json.list.length; i= i+8){
                const futureHumid = json.list[i-1].main.humidity
                $(`#day${i/8}Humid`).append(futureHumid)
            }

            // Current Weather Icon
            const currentIcon = json.list[0].weather[0].icon
            const addIcon = $(`<img height='56' width='56' src="https://openweathermap.org/img/wn/${currentIcon}@2x.png">`)
            cityCurrent.append(addIcon)

            // Future Humidity
            for (let i = 8; i-1 <json.list.length; i= i+8){
                const futureIcon = json.list[i-1].weather[0].icon
                const futureAddIcon = $(`<img height='56' width='56' src="https://openweathermap.org/img/wn/${futureIcon}@2x.png">`)
                $(`#day${i/8}Icon`).append(futureAddIcon)
            }
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
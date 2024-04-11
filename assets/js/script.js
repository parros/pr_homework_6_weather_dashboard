const cityCurrent = $('#cityCurrent')
const previousSearch = $('#previousSearch')
const searchSubmit = $('#searchSubmit')
const searchCity = $('#searchCity')
const cityBtn = $('.cityBtn')

// Search city info through API
function searchInfo(cityName) {

    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=09f5fc783fda185655df2bae2ca3196b`)
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
            // Keeping important information
            const importantDays = []
            importantDays.push(json.list[0])
            for (let i = 8; i-1 <json.list.length; i= i+8){
                importantDays.push(json.list[i-1])
            }
            // importantDays.push([city cityName])
            importantDays.push({city: cityName})
            const oldCityInfo = JSON.parse(localStorage.getItem('oldInfo')) || []
            oldCityInfo.push(importantDays)
            localStorage.setItem(`oldInfo`, JSON.stringify(oldCityInfo))
            showInfo(importantDays)
        })
    })
}

function showInfo(importantDays){

    // Current Time
    const time = importantDays[0].dt * 1000
    const currentDate = new Date(time)
    const currentMonth = currentDate.getMonth() + 1
    const currentDay = currentDate.getDate()
    const currentYear = currentDate.getFullYear()
    cityCurrent.append(` (${currentMonth}/${currentDay}/${currentYear})`)

    // Future Time
    for (let i = 1; i <importantDays.length-1; i++){
        $(`#day${i}Date`).empty()
        const futureTime = importantDays[i].dt * 1000
        const futureDate = new Date(futureTime)
        const futureMonth = futureDate.getMonth() + 1
        const futureDay = futureDate.getDate()
        const futureYear = futureDate.getFullYear()
        $(`#day${i}Date`).append(`${futureMonth}/${futureDay}/${futureYear}`)
    }

    // Current Wind Speed
    $('#currentWind').empty()
    const currentWindSpeed = importantDays[0].wind.speed
    $('#currentWind').append(currentWindSpeed)

    // Future Wind Speed
    for (let i = 1; i <importantDays.length-1; i++){
        $(`#day${i}Wind`).empty()
        const futureWindSpeed = importantDays[i].wind.speed
        $(`#day${i}Wind`).append(futureWindSpeed)
    }

    // Current Temp
    $('#currentTemp').empty()
    const tempInK = importantDays[0].main.temp
    const tempInF = (tempInK-273.15)*1.8+32
    const currentTemp = tempInF.toFixed(2)
    $('#currentTemp').append(currentTemp)

    for (let i = 1; i <importantDays.length-1; i++){
        $(`#day${i}Temp`).empty()
        const futureTempInK = importantDays[i].main.temp
        const futureTempInF = (futureTempInK-273.15)*1.8+32
        const futureTemp = futureTempInF.toFixed(2)
        $(`#day${i}Temp`).append(futureTemp)
    }

    // Current Humidity
    $('#currentHumid').empty()
    const currentHumid = importantDays[0].main.humidity
    $('#currentHumid').append(currentHumid)

    // Future Humidity
    for (let i = 1; i <importantDays.length-1; i++){
        $(`#day${i}Humid`).empty()
        const futureHumid = importantDays[i].main.humidity
        $(`#day${i}Humid`).append(futureHumid)
    }

    // Current Weather Icon
    const currentIcon = importantDays[0].weather[0].icon
    const addIcon = $(`<img height='56' width='56' src="https://openweathermap.org/img/wn/${currentIcon}@2x.png">`)
    cityCurrent.append(addIcon)

    // Future Humidity
    for (let i = 1; i <importantDays.length-1; i++){
        $(`#day${i}Icon`).empty()
        const futureIcon = importantDays[i].weather[0].icon
        const futureAddIcon = $(`<img height='56' width='56' src="https://openweathermap.org/img/wn/${futureIcon}@2x.png">`)
        $(`#day${i}Icon`).append(futureAddIcon)
    }
}

function newCityInfo(event) {
    event.preventDefault()
    const cityName = searchCity.val()
    const newInfo = $(`
    <li><Button type="text" id='${cityName}' class="cityBtn">${cityName}</Button></li>
    `)
    cityCurrent.empty()
    cityCurrent.append(cityName)
    previousSearch.append(newInfo)
    searchInfo(cityName)
}

function loadOldInfo() {
    const oldInfo = JSON.parse(localStorage.getItem('oldInfo')) || ''
    if (oldInfo === '') {
        return
    }
    previousSearch.empty()
    for (const cityInfo of oldInfo){
    const cityName = cityInfo[6].city
        const oldBtn=(`
        <li><Button type="text" id='${cityName}' class="cityBtn">${cityName}</Button></li>
        `) 
        previousSearch.append(oldBtn)
    }
}

function oldCityInfo(event) {
    // Retrieving city info from button
    const oldCityId = $(event.target).closest('cityBtn').prevObject[0].id
    const oldCity = JSON.parse(localStorage.getItem('oldInfo'))

    //clear prvious info
    cityCurrent.empty()
    cityCurrent.append(oldCityId)

    for (const city of oldCity){
        if (city[6].city === oldCityId)
        showInfo(city)
    }
}

$(document).ready(function () {
searchSubmit.on('click', newCityInfo)
$('#previousSearch').on('click', '.cityBtn', oldCityInfo)
loadOldInfo()
})
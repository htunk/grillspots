var SunCalc = require('suncalc');

/* Manually set sun obstacle heights in degrees */
const obstacleHeights = {
    "very low": 5,
    "low": 20,
    "medium": 30,
    "high": 50,
    "very high": 70
}

const addWeatherInfo = ( args ) => {
    const sunTimes = SunCalc.getTimes(new Date(),
        args.spot.location.geometry.coordinates[1],
        args.spot.location.geometry.coordinates[0])

    // Is it night time?
    if (Date.now() > sunTimes.dusk || Date.now() < sunTimes.sunrise) {
        args.spot.weather = 'night'
        return
    }

    // Is it raining? (See condition list: https://allaboutweather.tripod.com/presentweather.htm)
    if (args.weather.condition >= 30) {
        args.spot.weather = 'rain'
        return
    }

    // Is it cloudy? (Cloud level over 5/8)
    if  (args.weather.clouds > 5) {
        args.spot.weather = 'clouds'
        return
    }

    // Obstacle data missing?
    if (!args.spot.obstacles) {
        args.spot.weather = 'undefined'
        return
    }


    //Check sun obstacles
    const sunPosition = SunCalc.getPosition(new Date(),
        args.spot.location.geometry.coordinates[1],
        args.spot.location.geometry.coordinates[0]);

    const azimuth = Math.round((sunPosition.azimuth + Math.PI /* <- S to N azimuth */) * 180 / Math.PI)
    const altitude = sunPosition.altitude * 180 / Math.PI

    const currentHeight = args.spot.obstacles.find(i => {
        return (azimuth >= i.lower && azimuth <= i.upper)
    })
    const heightStr = currentHeight.height

    altitude > obstacleHeights[heightStr] ?
        args.spot.weather = 'sunny' :
        args.spot.weather = 'shade'
}

export { addWeatherInfo };

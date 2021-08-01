var SunCalc = require('suncalc');

/* Manually set obstacle heights in degrees */
const obstacleHeights = {
    "very low" : 5,
    "low" : 20,
    "medium" : 30,
    "high" : 50,
    "very high" : 70
}

const addWeatherInfo = ( spot ) => {
    const sunTimes = SunCalc.getTimes(new Date(), 
                                      spot.location.geometry.coordinates[1], 
                                      spot.location.geometry.coordinates[0])
    
    // Is it night time?
    if (Date.now() > sunTimes.dusk || Date.now() < sunTimes.sunrise) {
        spot.weather = 'night'
        return
    }

    // Is it raining?
    // No, it never rains in Otaniemi (TODO: Clouds/rain from FMI)

    // Obstacle data missing?
    if (!spot.obstacles) {
        spot.weather = 'undefined'
        return
    }


    //Check sun obstacles
    const sunPosition = SunCalc.getPosition(new Date(), 
                                            spot.location.geometry.coordinates[1], 
                                            spot.location.geometry.coordinates[0]);

    const azimuth = Math.round((sunPosition.azimuth + Math.PI /* <- S to N azimuth */) * 180 / Math.PI)
    const altitude = sunPosition.altitude * 180 / Math.PI

    console.log(`Azimuth: ${azimuth}`)
    const currentHeight = spot.obstacles.find(i => {
        return (azimuth >= i.lower && azimuth <= i.upper)
    })
    const heightStr = currentHeight.height

    altitude > obstacleHeights[heightStr] ? 
    spot.weather = 'sunny' :
    spot.weather = 'shade'
}

export default addWeatherInfo;

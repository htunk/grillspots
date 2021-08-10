import React from 'react';

import grillIcon from './assets/features/grill-white.svg';
import grillDisabledIcon from './assets/features/grill-disabled.svg';
import tableIcon from './assets/features/table-white.svg';
import tableDisabledIcon from './assets/features/table-disabled.svg';
import benchIcon from './assets/features/bench-white.svg';
import benchDisabledIcon from './assets/features/bench-disabled.svg';

import navigationIcon from './assets/features/navigate-white.svg';

import sunIcon from './assets/weather/wi-day-sunny.svg';
import nightIcon from './assets/weather/wi-moon-waning-crescent-3.svg';
import rainIcon from './assets/weather/wi-rain.svg';
import cloudIcon from './assets/weather/wi-cloud.svg';
import shadeIcon from './assets/weather/wi-solar-eclipse.svg';
import undefinedIcon from './assets/weather/wi-alien.svg';

const selectWeatherString = ( str ) => {
    switch(str) {
        case 'sunny':
            return "Aurinkoista"
        case 'rain':
            return "Sateista"
        case 'shade':
            return "Varjoisaa"
        case 'clouds':
            return "Pilvistä"
        case 'night':
            return "Yö"
        case 'undefined':
            return "Teoriassa aurinkoista"
        default:
            return "Undefined"
    }
}

const selectWeatherIcon = ( str ) => {
    switch(str) {
        case 'sunny':
            return sunIcon
        case 'rain':
            return rainIcon
        case 'shade':
            return shadeIcon
        case 'clouds':
            return cloudIcon
        case 'night':
            return nightIcon
        case 'undefined':
            return undefinedIcon
        default:
            return undefinedIcon
    }
}

const SheetHeader = (props) => {
    return (
        <div className="sheet-header">
            <h1>{props.content.name}</h1>
            <div className="sheet-header-weather">
                <p>{Math.round(props.weather.temperature)} °C</p>
                <img src={selectWeatherIcon(props.content.weather)} alt="weatherIcon" />
                <p>{selectWeatherString(props.content.weather)}</p>
            </div>
        </div>
    )
}

const SheetContent = (props) => {
    return (
        <div className="sheet-content">
            <div className="sheet-content-features">
                <div>
                    <div className={props.content.features.hasGrill ? "circle-background-green" : "circle-background-gray"}>
                        <img src={props.content.features.hasGrill ? grillIcon : grillDisabledIcon} alt="" />
                    </div>

                    <p>Grilli</p>
                </div>
                <div>
                    <div className={props.content.features.hasChairs ? "circle-background-green" : "circle-background-gray"}>
                        <img src={props.content.features.hasChairs ? benchIcon : benchDisabledIcon} alt="" />
                    </div>
                    <p>Penkit</p>
                </div>
                <div>
                    <div className={props.content.features.hasTables ? "circle-background-green" : "circle-background-gray"}>
                        <img src={props.content.features.hasTables ? tableIcon : tableDisabledIcon} alt="" />
                    </div>
                    <p>Pöytä</p>
                </div>
            </div>

            <div className="sheet-content-route">
                <div onClick={() => window.location.href = `https://maps.apple.com/?daddr=${props.content.location.geometry.coordinates[1]},${props.content.location.geometry.coordinates[0]}`}>
                    <p>Reitti</p>
                    <img src={navigationIcon} alt="" />
                </div>
            </div>
        </div>
    )
}

export { SheetHeader, SheetContent };

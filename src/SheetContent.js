import React from 'react';
import sunIcon from './assets/weather/wi-day-sunny.svg';
import grillIcon from './assets/features/grill-white.svg';
import grillDisabledIcon from './assets/features/grill-disabled.svg';
import tableIcon from './assets/features/table-white.svg';
import tableDisabledIcon from './assets/features/table-disabled.svg';
import benchIcon from './assets/features/bench-white.svg';
import benchDisabledIcon from './assets/features/bench-disabled.svg';
import navigationIcon from './assets/features/navigate-white.svg';

const SheetHeader = (props) => {
    return (
        <div className="sheet-header">
            <h1>{props.content.name}</h1>
            <div className="sheet-header-weather">
                <p>22 °C</p>
                <img src={sunIcon} alt="sun" />
                <p>Aurinkoista</p>
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

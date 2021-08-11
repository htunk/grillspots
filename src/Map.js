import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import data from './data.json'
import { addWeatherInfo } from './weather';

import markerNight from './assets/markers/grill-icon-night.png';
import markerRain from './assets/markers/grill-icon-rain.png';
import markerShade from './assets/markers/grill-icon-shade.png';
import markerSun from './assets/markers/grill-icon-sun.png';
import markerUndefined from './assets/markers/grill-icon-undefined.png';

mapboxgl.accessToken =
'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const Map = ( props ) => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(24.833);
  const [lat, setLat] = useState(60.189);
  const [zoom, setZoom] = useState(14.00);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
      maxZoom: 20,
      minZoom: 13.00
    });

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });
    
    // Get weather
    const fiveMinutesMillis = 1000 * 60 * 5;
    const halfHourMillis = 1000 * 60 * 30;
    const date = new Date();
    // Snap to nearest 5 min
    const rounded = new Date(Math.round(date.getTime() / fiveMinutesMillis) * fiveMinutesMillis);
    const tenMinutesAgo = new Date(rounded - halfHourMillis);
    const url = `https://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=getFeature&starttime=${tenMinutesAgo.toISOString()}&endtime=${rounded.toISOString()}&storedquery_id=fmi::observations::weather::multipointcoverage&place=otaniemi&parameters=t2m,n_man,wawa`
    console.log(url)
    fetch(url)
        .then(response => response.text())
        .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
        .then(
            xml => {
                const rawData = xml.getElementsByTagName("gml:doubleOrNilReasonTupleList")[0].childNodes[0].nodeValue
                const latestObservation = rawData.trim().split('\n').pop().trim().split(' ') // [t2m, n_man]
                const weatherObject = {
                  temperature: parseFloat(latestObservation[0]),
                  clouds: parseFloat(latestObservation[1]),
                  condition: parseFloat(latestObservation[2])
                }
                props.updateWeather(weatherObject)
                createMarkers({
                  map: map,
                  openSheet: props.openSheet,
                  spots: data,
                  weather: weatherObject
                })
        });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='map-container' ref={mapContainerRef} />
  );
};

const Marker = ( props ) => {
  const markerOnClick = () => {
    props.map.easeTo({
      center: props.spot.location.geometry.coordinates,
      essential: true
    });
    props.openSheet(props.spot)
  }

  const selectMarker = () => {
    switch(props.spot.weather) {
      case 'sunny':
        return markerSun
      case 'rain':
        return markerRain
      case 'shade':
        return markerShade
      case 'clouds':
        return markerShade
      case 'night':
        return markerNight
      default:
        return markerUndefined
    }
  }
  
  return (
    <button className="asd" onClick={markerOnClick}>
      <img className="map-marker-icon" alt="Marker" src={selectMarker()} />
    </button>
  )
}

const createMarkers = ( args ) => {
  args.spots.forEach(spot => {
    addWeatherInfo({
      spot: spot,
      weather: args.weather
    })
    const markerEl = document.createElement('div')
    markerEl.className = 'map-marker'
    ReactDOM.render(<Marker map={args.map} 
                            openSheet={args.openSheet}
                            spot={spot}/>, markerEl)
    new mapboxgl.Marker(markerEl).setLngLat(spot.location.geometry.coordinates).addTo(args.map)
  })
}

export default Map;

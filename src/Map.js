import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import addWeatherInfo from './weather';
import './Map.css';

import markerNight from './assets/grill-icon-night.png';
import markerRain from './assets/grill-icon-rain.png';
import markerShade from './assets/grill-icon-shade.png';
import markerSun from './assets/grill-icon-sun.png';
import markerUndefined from './assets/grill-icon-undefined.png';

mapboxgl.accessToken =
'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const Map = ( props ) => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(24.830);
  const [lat, setLat] = useState(60.186);
  const [zoom, setZoom] = useState(14.75);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
      maxZoom: 20,
      minZoom: 14.75
    });

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    parseData({
      map: map,
      openSheet: props.openSheet
    })

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

const parseData = ( args ) => {
  const data = require('./data.json');
  console.log(data)
  data.forEach(spot => {
    //spot.weather = "shade" //TODO: Real analysis
    addWeatherInfo(spot)
    const markerEl = document.createElement('div')
    markerEl.className = 'map-marker'

    ReactDOM.render(<Marker map={args.map} 
                            openSheet={args.openSheet}
                            spot={spot}/>, markerEl)
    new mapboxgl.Marker(markerEl).setLngLat(spot.location.geometry.coordinates).addTo(args.map)
  })
}

export default Map;

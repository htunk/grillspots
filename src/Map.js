import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import markerNight from './assets/grill-icon-night.png';

mapboxgl.accessToken =
  'pk.eyJ1IjoiaGFsbGl0dW5ra2kiLCJhIjoiY2tnM2xrdDJrMGJ5czJ3a3ozMzdtc2pteiJ9.m7nIrU606unNfKVqxB63ag';

const Map = ( props ) => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(24.830);
  const [lat, setLat] = useState(60.186);
  const [zoom, setZoom] = useState(14.75);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/hallitunkki/ckquv6kmh0v5l17s2cnegjnmw',
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
      setOpen: props.setOpen
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
      center: props.coordinates,
      essential: true
    });
    props.setOpen(true)
  }
  
  return (
    <button className="asd" onClick={markerOnClick}>
      <img className="map-marker-icon" src={markerNight} />
    </button>
  )
}

const parseData = ( args ) => {
  const data = require('./data.json');
  console.log(data)
  data.forEach(spot => {
    const markerEl = document.createElement('div')
    markerEl.className = 'map-marker'

    ReactDOM.render(<Marker map={args.map} 
                            setOpen={args.setOpen}
                            coordinates={spot.location.geometry.coordinates}/>, markerEl)
    new mapboxgl.Marker(markerEl).setLngLat(spot.location.geometry.coordinates).addTo(args.map)
  })
}

export default Map;

import mapboxgl from 'mapbox-gl'
import data from './static/data.json'

mapboxgl.accessToken = 'pk.eyJ1IjoiaGFsbGl0dW5ra2kiLCJhIjoiY2tnM2xrdDJrMGJ5czJ3a3ozMzdtc2pteiJ9.m7nIrU606unNfKVqxB63ag';
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/hallitunkki/ckquv6kmh0v5l17s2cnegjnmw',
  center: [24.830, 60.186],
  maxZoom: 20,
  minZoom: 14.75,
  zoom: 1.5
})

const parseData = () => {
  data.forEach(spot => {
    spot.sunny = true //TODO: Actual sun analysis
    //Create markers
    const markerEl = document.createElement('div')
    markerEl.className = 'marker'
    markerEl.style.width = '5px'
    markerEl.style.height = '5px'
    markerEl.style.backgroundColor = 'red'
    markerEl.addEventListener('click', onClick = () => {
      map.easeTo({
        center: spot.location.geometry.coordinates,
        essential: true
      });
    })
    new mapboxgl.Marker(markerEl).setLngLat(spot.location.geometry.coordinates)
      .addTo(map)

  })
}


parseData()
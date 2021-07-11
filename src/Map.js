import React, {useState, useRef, useCallback} from 'react';
import DeckGL from '@deck.gl/react';
import { FlyToInterpolator } from "@deck.gl/core";
import {ScatterplotLayer} from '@deck.gl/layers';
import {StaticMap} from 'react-map-gl';
import {CesiumIonLoader} from '@loaders.gl/3d-tiles';
import {Tile3DLayer} from '@deck.gl/geo-layers';

import {MapboxLayer} from '@deck.gl/mapbox';


const data = [
    {position: [-74.5, 40], size: 100}
];

export function Map() {
    // DeckGL and mapbox will both draw into this WebGL context
    const [glContext, setGLContext] = useState();
    const deckRef = useRef(null);
    const mapRef = useRef(null);

    const [initialViewState, setInitialViewState] = useState({
        zoom: 14,
        latitude: 60.188298093350895,
        longitude: 24.836385288882628,
        bearing: 0,
        pitch: 0,
    });

    const goTo = ({latitude, longitude, zoom, pitch, transitionDuration = 2000}) => {
        const newState = initialViewState;
        if (latitude) newState.latitude = latitude;
        if (longitude) newState.longitude = longitude;
        if (zoom) newState.zoom = zoom;
        if (pitch) newState.pitch = pitch;
        newState.transitionDuration = transitionDuration;
        console.log(newState);
        setInitialViewState({
            ...newState,
            transitionInterpolator: new FlyToInterpolator()
        });
    }
    const onMapLoad = useCallback(() => {
        const map = mapRef.current.getMap();
        const deck = deckRef.current.deck;

        // You must initialize an empty deck.gl layer to prevent flashing
        map.addLayer(
            // This id has to match the id of the deck.gl layer
            new MapboxLayer({ id: "my-scatterplot", deck }),
            // Optionally define id from Mapbox layer stack under which to add deck layer
        );
        console.log("??");
    }, []);


    /*
    setTimeout(() =>{
        console.log("???zooming now");
        goTo({latitude: 61, longitude: 24, zoom: 16, pitch: 60});
    }, 5000);

     */
    const layers = [
        new ScatterplotLayer({
            id: 'my-scatterplot',
            data,
            getPosition: d => d.position,
            getRadius: d => d.size,
            getFillColor: [255, 0, 0]
        }),
    ];

    /*const layer3d = new Tile3DLayer({
        id: 'tile-3d-layer',
        // tileset json file url
        data: 'https://assets.cesium.com/510668/tileset.json',
        loader: CesiumIonLoader,
        // https://cesium.com/docs/rest-api/
        loadOptions: {
            'cesium-ion': {accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxM2U3OWRkOS0wNWU2LTRkZGYtOGVjYy1jZjgxMmIwZDBlM2MiLCJpZCI6NjEzMjksImlhdCI6MTYyNTk5NDgxMn0.0ZFVJ788M1L5qG1K0BDAM1eWuFXAUgIJxXj3a6LNXJ4'}
        },
        // override scenegraph subLayer prop
        _subLayerProps: {
            scenegraph: {_lighting: 'flat'}
        }
    });
    layers.push(layer3d);
    */

    return (
        <DeckGL
            ref={deckRef}
            layers={layers}
            initialViewState={initialViewState}
            controller={true}
            onWebGLInitialized={setGLContext}
            glOptions={{
                /* To render vector tile polygons correctly */
                stencil: true
            }}
        >
            {glContext && (
                /* This is important: Mapbox must be instantiated after the WebGLContext is available */
                <StaticMap
                    ref={mapRef}
                    gl={glContext}
                    mapStyle="mapbox://styles/mapbox/satellite-v9"
                    mapboxApiAccessToken="pk.eyJ1IjoicGFsaWtrIiwiYSI6ImNrcXl5MjFpazFjenkydnFwcDdybzBpanMifQ.mnNlpvmNIgMiiRWnoqAGzw"
                    onLoad={onMapLoad}
                />
            )}
        </DeckGL>
    );
}
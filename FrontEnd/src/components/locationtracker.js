import React, { useState, useEffect } from 'react';
import { mapboxgl } from 'mapbox-gl-geocoder'

const ISSMap = () => {
    mapboxgl.accessToken = 'pk.eyJ1IjoibGlraXRodXMyMDAwIiwiYSI6ImNsaXJiYnRpMjBzZ3UzZW5xYm1ma2Z0bGwifQ.Ay_bIaEgpub2zhtQc07b8w';
    const map = new mapboxgl.Map({
        container: 'map',
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/streets-v12',
        zoom: 1.5
    });

    map.on('load', async () => {
        // Get the initial location of the International Space Station (ISS).
        const geojson = await getLocation();
        // Add the ISS location as a source.
        map.addSource('iss', {
            type: 'geojson',
            data: geojson
        });
        // Add the rocket symbol layer to the map.
        map.addLayer({
            'id': 'iss',
            'type': 'symbol',
            'source': 'iss',
            'layout': {
                // This icon is a part of the Mapbox Streets style.
                // To view all images available in a Mapbox style, open
                // the style in Mapbox Studio and click the "Images" tab.
                // To add a new image to the style at runtime see
                // https://docs.mapbox.com/mapbox-gl-js/example/add-image/
                'icon-image': 'rocket'
            }
        });

        // Update the source from the API every 2 seconds.
        const updateSource = setInterval(async () => {
            const geojson = await getLocation(updateSource);
            map.getSource('iss').setData(geojson);
        }, 2000);

        async function getLocation(updateSource) {
            // Make a GET request to the API and return the location of the ISS.
            try {
                const response = await fetch(
                    'https://api.wheretheiss.at/v1/satellites/25544',
                    { method: 'GET' }
                );
                const { latitude, longitude } = await response.json();
                // Fly the map to the location.
                map.flyTo({
                    center: [longitude, latitude],
                    speed: 0.5
                });
                // Return the location of the ISS as GeoJSON.
                return {
                    'type': 'FeatureCollection',
                    'features': [
                        {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [longitude, latitude]
                            }
                        }
                    ]
                };
            } catch (err) {
                // If the updateSource interval is defined, clear the interval to stop updating the source.
                if (updateSource) clearInterval(updateSource);
                throw new Error(err);
            }
        }
    });

    return (
        <div id="map"></div>
    );
};

export default ISSMap;

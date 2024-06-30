import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from 'mapbox-gl-geocoder';

// Replace 'YOUR_MAPBOX_ACCESS_TOKEN' with your actual Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoibGlraXRodXMyMDAwIiwiYSI6ImNsaXJiYnRpMjBzZ3UzZW5xYm1ma2Z0bGwifQ.Ay_bIaEgpub2zhtQc07b8w';

const MapComponent = () => {
    const mapContainerRef = useRef(null);
    const [map, setMap] = useState(null);
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        const initializeMap = ({ setMap, mapContainer }) => {
            const mapInstance = new mapboxgl.Map({
                container: mapContainer,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [-74.5, 40], // Set default map center coordinates
                zoom: 9, // Set default zoom level
            });

            mapInstance.on('load', () => {
                setMap(mapInstance);

                // Add geocoder control for searching locations
                const geocoder = new MapboxGeocoder({
                    accessToken: mapboxgl.accessToken,
                    mapboxgl: mapboxgl,
                });

                mapInstance.addControl(geocoder);

                // Listen for selected location from geocoder
                geocoder.on('result', (e) => {
                    const { center } = e.result.geometry;
                    setMapCenter(center);
                });
            });
        };

        if (!map) {
            initializeMap({ setMap, mapContainer: mapContainerRef.current });
        }
    }, [map]);

    const setMapCenter = (center) => {
        if (map) {
            map.flyTo({ center, zoom: 14 }); // Fly to the location with a higher zoom level
        }
    };

    useEffect(() => {
        const watchUserLocation = () => {
            if ('geolocation' in navigator) {
                const options = {
                    enableHighAccuracy: true, // Enable high accuracy mode
                    timeout: 5000, // Set timeout to 5 seconds
                    maximumAge: 0, // Force a fresh location reading
                };

                const watchId = navigator.geolocation.watchPosition(
                    (position) => {
                        const { coords } = position;
                        setUserLocation({
                            longitude: coords.longitude,
                            latitude: coords.latitude,
                        });
                    },
                    (error) => {
                        console.error('Error getting user location:', error);
                    },
                    options
                );

                return () => {
                    navigator.geolocation.clearWatch(watchId); // Stop watching for location changes when the component unmounts
                };
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        };

        watchUserLocation();
    }, []);

    useEffect(() => {
        if (map && userLocation) {
            const { longitude, latitude } = userLocation;

            // Create a marker for the user's location
            new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);

            // Set the map center to the user's location
            setMapCenter([longitude, latitude]);
        }
    }, [map, userLocation]);

    return <div ref={mapContainerRef} style={{ height: '100vh' }} />;
};

export default MapComponent;

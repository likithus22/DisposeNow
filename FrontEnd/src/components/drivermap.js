import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

// Replace 'YOUR_MAPBOX_ACCESS_TOKEN' with your actual Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoibGlraXRodXMyMDAwIiwiYSI6ImNsaXJiYnRpMjBzZ3UzZW5xYm1ma2Z0bGwifQ.Ay_bIaEgpub2zhtQc07b8w';

const MapComponentD = () => {
    const mapContainerRef = useRef(null);
    const [map, setMap] = useState(null);
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        const initializeMap = () => {
            const mapInstance = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [-74.5, 40], // Set default map center coordinates
                zoom: 9, // Set default zoom level
            });

            setMap(mapInstance);

            // Clean up map instance when the component unmounts
            return () => mapInstance.remove();
        };

        initializeMap();
    }, []);

    useEffect(() => {
        if (map && userLocation) {
            const { longitude, latitude } = userLocation;

            // Create a marker for the user's location
            const marker = new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);

            // Set the map center to the user's location
            map.setCenter([longitude, latitude]);

            // Clean up marker when the component unmounts or location changes
            return () => marker.remove();
        }
    }, [map, userLocation]);

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

                // Clean up geolocation watch when the component unmounts
                return () => navigator.geolocation.clearWatch(watchId);
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        };

        watchUserLocation();
    }, []);

    return <div ref={mapContainerRef} style={{ height: '100vh' }} />;
};

export default MapComponentD;

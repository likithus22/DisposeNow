import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from 'mapbox-gl-geocoder';
import Config from '../core/config';


//*****access token of mapboxgl***** 
mapboxgl.accessToken = 'pk.eyJ1IjoibGlraXRodXMyMDAwIiwiYSI6ImNsaXJiYnRpMjBzZ3UzZW5xYm1ma2Z0bGwifQ.Ay_bIaEgpub2zhtQc07b8w';

const Bmaping = () => {

    // global deceleration
    const mapContainerRef = useRef(null);
    const [map, setMap] = useState(null);
    const [userLocation, setUserLocation] = useState({ longitude: '0', latitude: '0' });
    const [collectorloc, setcollectorloc] = useState(null);

    //*********************************binging of map initializations**************************************
    useEffect(() => {
        const initializeMap = ({ setMap, mapContainer }) => {
            console.log(' map is getting initilized');
            const mapInstance = new mapboxgl.Map({
                container: mapContainer,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [-74.5, 45], // Set default map center coordinates
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
                    // const { center } = e.result.geometry;
                    // setMapCenter(center);
                    var coordinates = e.result.geometry.coordinates;
                    console.log('Selected Location Coordinates:', coordinates)
                });
            });
        };
        if (!map) {
            console.log('setting up initilization');
            initializeMap({ setMap, mapContainer: mapContainerRef.current });
        }
        console.log(' inintilization of the map is completed');
    }, [map]);

    //---------------------------------initializations of the map end here-------------------------------------

    //*********************************initializations of the markers begin here**************************************
    useEffect(() => {
        const markerInitialization = async () => {
            console.log('markers are getting initilized1');
            const pos = await Config();
            console.log(pos.locationlong, pos.locationlat);
            console.log('markers are getting initilized2');
            var mar1 = new mapboxgl.Marker();
            mar1.setLngLat([pos.locationlong, pos.locationlat]).addTo(map);
            console.log('markers are getting initilized3');
            var mar2 = new mapboxgl.Marker();
            console.log('markers are getting initilized4');
            console.log('markers initilizaitin completed');
            setcollectorloc(mar2)
        }
        if (map) {
            markerInitialization();
        }
        // markerInitialization();
    }, [map])
    //---------------------------------initializations of the marker end here-------------------------------------

    //*********************************function to update marker regularly **************************************
    useEffect(() => {
        if (!map || !collectorloc) return; // Ensure map and collectorloc are not null before updating the marker

        const long = userLocation.longitude;
        const lat = userLocation.latitude;
        console.log(long,lat);
        collectorloc.setLngLat([long, lat]).addTo(map);
        map.flyTo({ center: [long, lat], zoom: 19, speed: 1.2 }); // Fly to the updated marker with a smooth animation
        console.log('markers update completed');
    }, [map, collectorloc, userLocation]);

    //--------------------------------- function to update marker ends here-------------------------------------

    //*********************************function to update user location **************************************
    const watchUserLocation = async () => {
        console.log('user location getting fetched');
        if ('geolocation' in navigator) {
            const options = {
                enableHighAccuracy: true, // Enable high accuracy mode
                timeout: 15000, // Set timeout to 15 seconds (increased from 10 seconds)
                maximumAge: 0, // Force a fresh location reading
            };

            const successCallback = (position) => {
                const { coords } = position;
                // Config the user here

                setUserLocation({
                    longitude: coords.longitude,
                    latitude: coords.latitude,
                });
            };

            const errorCallback = (error) => {
                console.error('Error getting user location:', error);
            };

            navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
        console.log('fetching user location completed');
    };

    useEffect(() => {
        const intervalId = setInterval(watchUserLocation, 5000); // Start the interval after component mounting

        // Call watchUserLocation once immediately to get the initial location
        watchUserLocation();

        return () => {
            clearInterval(intervalId); // Cleanup function to clear the interval when the component unmounts
        };
    }, []);
    //--------------------------------- function to update user location ends here-------------------------------------

    //+++++++ the return code
    return <div ref={mapContainerRef} id='cont' style={{ height: '100vh', width: '60vw' }} />;
};

export default Bmaping;

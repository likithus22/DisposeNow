import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from 'mapbox-gl-geocoder';
// import Config from '../core/config';

//*****access token of mapboxgl***** 
mapboxgl.accessToken = 'pk.eyJ1IjoibGlraXRodXMyMDAwIiwiYSI6ImNsaXJiYnRpMjBzZ3UzZW5xYm1ma2Z0bGwifQ.Ay_bIaEgpub2zhtQc07b8w';

const Colmap = () => {

    // global deceleration
    const mapContainerRef = useRef(null);
    const [map, setMap] = useState(null);
    const [userLocation, setUserLocation] = useState({ longitude: '0', latitude: '0' });
    const [collectorloc, setcollectorloc] = useState(null);
    const [conn, setconn] = useState(null);
    var flag = false;
    // const [message, setMessage] = useState('');
    // const [receivedMessage, setReceivedMessage] = useState('');


    //*********************************binging of map initializations**************************************
    useEffect(() => {
        const initializeMap = ({ setMap, mapContainer }) => {
            // console.log(' map is getting initilized');
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
                    // var coordinates = e.result.geometry.coordinates;
                    // console.log('Selected Location Coordinates:', coordinates)
                });
            });
        };
        if (!map) {
            // console.log('setting up initilization');
            initializeMap({ setMap, mapContainer: mapContainerRef.current });
        }
        // console.log(' inintilization of the map is completed');
    }, [map]);

    //---------------------------------initializations of the map end here-------------------------------------

    //*********************************initializations of the markers begin here**************************************
    useEffect(() => {
        const markerInitialization = async () => {
            // console.log('markers are getting initilized1');
            // const pos = await Config();
            // console.log(pos.locationlong, pos.locationlat);
            // console.log('markers are getting initilized2');
            // var mar1 = new mapboxgl.Marker();
            // mar1.setLngLat([pos.locationlong, pos.locationlat]).addTo(map);
            // console.log('markers are getting initilized3');
            var mar2 = new mapboxgl.Marker();
            // console.log('markers are getting initilized4');
            // console.log('markers initilizaitin completed');
            setcollectorloc(mar2)
            // estb()
        }
        if (map) {
            markerInitialization();
        }
        // markerInitialization();
    }, [map])
    //---------------------------------initializations of the marker end here-------------------------------------

    //*********************************the web socket component to connect server**************************************
    useEffect(() => {
        console.log("connector function started");
        const set_conn = async () => {
            console.log("starting of the set_conn ", conn);
            console.log('setting connection');
            const socket1 = new WebSocket('ws://20.204.10.248:5001');
            setconn(socket1);
            // eslint-disable-next-line react-hooks/exhaustive-deps
            flag = true;
            console.log("immidiatly afre request", socket1);
            console.log("immediately after setting", conn);
            socket1.onopen = () => {
                console.log('WebSocket connection established');
                console.log("inside on open", conn);
            };
            socket1.onerror = (error) => {
                console.log('WebSocket error:', error);
            }
            socket1.onmessage = (event) => {
                const messageBlob = event.data;
                messageBlob.text().then((text) => {
                    const message = JSON.parse(text);
                    console.log('Received message from server:', message);
                    // Process the message further as needed
                    // ...
                }).catch((error) => {
                    console.error('Error reading Blob as text:', error);
                });
            };

            socket1.onclose = (event) => {
                console.log('WebSocket connection closed with code:', event.code);
                setconn(null);
            };

        }

        if (!conn && !flag) {
            const b = set_conn();
            // setconn(b.PromiseResult);
            console.log("inside if b", b);
            console.log("inside if conn", conn);
        }
        console.log("outside of all", conn);
    }, [conn])
    //-------------------------the websocket component to connect server ends here------------------------
    
    //*********************************function to update marker regularly **************************************
    useEffect(() => {
        // const markup = () =>{
        if (!map || !collectorloc) return; // Ensure map and collectorloc are not null before updating the marker

        const long = userLocation.longitude;
        const lat = userLocation.latitude;
        // console.log(long, lat);
        collectorloc.setLngLat([long, lat]).addTo(map);
        console.log("locaiton marker updated");
        map.flyTo({ center: [long, lat], zoom: 19, speed: 1.2 }); // Fly to the updated marker with a smooth animation
        // if (userLocation && socket) {
        //     socket.send(JSON.stringify(userLocation));
        // }

        console.log('markers update completed');

    }, [map, collectorloc, userLocation]);
    //--------------------------------- function to update marker ends here-------------------------------------
    
    //*********************************the web socket component to send the data to server**************************************

    useEffect(() => {

        const hi = JSON.stringify(userLocation);
        console.log("in the sender function", conn);
        console.log("stingified data", hi);
        // console.log("redystate",conn.readyState);
        console.log("poneconstant", WebSocket.OPEN);
        // console.log(conn);
        if (conn && conn.readyState === WebSocket.OPEN) {
            conn.send(JSON.stringify(userLocation))
            console.log("message sent to server")
        }
    }, [conn, userLocation])
    //--------------------------------- function to update marker ends here-------------------------------------

    //*********************************function to update user location **************************************
    const watchUserLocation = async () => {
        // console.log('user location getting fetched');
        if ('geolocation' in navigator) {
            const options = {
                enableHighAccuracy: true, // Enable high accuracy mode
                timeout: 15000, // Set timeout to 15 seconds (increased from 10 seconds)
                maximumAge: 0, // Force a fresh location reading
            };

            const successCallback = (position) => {
                const { coords } = position;
                // Config the user here
                // setMessage(coords);
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

        // console.log('fetching user location completed');
    };

    useEffect(() => {
        const intervalId = setInterval(watchUserLocation, 2000); // Start the interval after component mounting
        // Call watchUserLocation once immediately to get the initial location
        watchUserLocation();
        // markup();
        return () => {
            clearInterval(intervalId); // Cleanup function to clear the interval when the component unmounts
        };
    }, []);
    //--------------------------------- function to update user location ends here-------------------------------------

    //+++++++ the return code+++++++++++++++++++
    return <div ref={mapContainerRef} id='cont' style={{ height: '100vh', width: '60vw' }} />;
};

export default Colmap;

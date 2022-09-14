import React from 'react'
import { GoogleMap, LoadScript} from '@react-google-maps/api';
import Geocode from 'react-geocode'


function GoogleMaps({updateLocation}) {
    
    
    const geocodeApiKey = process.env.REACT_APP_GEOCODE_API_KEY
    const [map, setMap] = React.useState(null)

    const containerStyle = {
        width: '400px',
        height: '400px'
      };
      
      const center = {
        lat: 45.9,
        lng: 15.523
      };
    
      const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
      }, [])


  return (
    
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={2}
          onLoad={onLoad}
          onClick={(e) => {
            const location = e.latLng.lat() + ", " + e.latLng.lng()
            Geocode.setApiKey(geocodeApiKey.toString());
            Geocode.fromLatLng(e.latLng.lat(), e.latLng.lng()).then(
              (response) => {
                const address = response.results[0].formatted_address.split(",").pop().substring(1)
                updateLocation(address,location)
              },
              (error) => {
                console.error(error);
              }
            );
            
          }}
        >
          <></>
        </GoogleMap>
  )
}

export default GoogleMaps
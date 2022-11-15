import React,{useEffect,useRef} from 'react';
import {Marker,Popup,useMap} from 'react-leaflet'
//import {showErrorAlert} from '../../../util/sweetAlert'
import { useDispatch,useSelector} from 'react-redux';
import { updateLocation } from '../../../services/actions';

const positionError = ( error ) => {
  switch ( error.code ) { 
      case error.PERMISSION_DENIED: 
  
          console.error( "User denied the request for Geolocation." ); 
          break; 

      case error.POSITION_UNAVAILABLE: 

          console.error( "Location information is unavailable." ); 
          break; 

      case error.TIMEOUT: 

          console.error( "The request to get user location timed out." ); 
          break; 

      case error.UNKNOWN_ERROR: 

          console.error( "An unknown error occurred." ); 
          break; 
      default:
  }
}

const LocationMarker = props => {
    const dispatch = useDispatch();
    const locationPosition = useSelector((state) => state.LocationReducer.currentLocation)
    const uMap = useMap();
    let geoWatch = useRef(null);
    let autoFly = useRef(false);
    useEffect(()=>{
       if(!geoWatch.current){
         if("geolocation" in navigator && "watchPosition" in navigator.geolocation){
          geoWatch.current = navigator.geolocation.watchPosition( (pos)=>{
            const currentPos = [pos.coords.latitude,pos.coords.longitude];
            if(!autoFly.current){
              uMap.flyTo(currentPos,17);
              autoFly.current = true;
            }
            dispatch(updateLocation(currentPos));
          }, positionError, { 
                  enableHighAccuracy: false, timeout: 15000, maximumAge: 0 
              }); 
         }
       }
       return function startClear(){
        navigator.geolocation.clearWatch(geoWatch.current);
        geoWatch.current = null;
       }
    },[uMap])
    
    // const uMap = useMap();
    // useEffect(()=>{
    //     uMap.locate().on('locationfound',(e)=>{
    //       console.log('current latlng',e.latlng);
    //       setPosition(e.latlng)
    //       uMap.flyTo(e.latlng)

    //     }).on('locationerror',(err)=>{
    //       console.warn('err',err);
    //       showErrorAlert('location Error');

    //     })
      // },[uMap])
    //  const test = ()=>{
    //   console.log('hello');
    // }
    return locationPosition.length > 0?(
      <Marker position={locationPosition}>
         <Popup>
           <p>Here is Your positon</p>
         </Popup>
      </Marker>
   ):null
}

export default LocationMarker;
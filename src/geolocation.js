
const geolocation = {
    geoWatch:null,
    init(){
        if("geolocation" in navigator){
            console.log('run geolocation');
            navigator.geolocation.getCurrentPosition( this.setCurrentPosition, this.positionError, { 
                enableHighAccuracy: true, 
                timeout: 15000, 
                maximumAge: 0 
            } );
        }else{
            alert('Your device not support geoloaction.');
        }
    },
    setCurrentPosition(position){
        const positionData = {
            accuracy:position.coords.accuracy,
            altitude:position.coords.altitude,
            altitudeAccuracy:position.coords.altitudeAccuracy,
            heading:position.coords.heading,
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        }
        console.log('positionData',positionData);
    },
    positionError( error ){
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
    },
    watchGeolocation(){
        if(!this.geoWatch){
            if ( "geolocation" in navigator && "watchPosition" in navigator.geolocation ) { 
    
                this.geoWatch = navigator.geolocation.watchPosition( this.setCurrentPosition, this.positionError, { 
                                enableHighAccuracy: false, timeout: 15000, maximumAge: 0 
                            } ); 
    
            } 
        }
    }
}

export default geolocation;
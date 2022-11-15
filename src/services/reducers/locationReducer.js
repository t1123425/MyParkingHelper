const initialState = {
    currentLocation:[]
}

const LocationReducer = (state = initialState, action) => {
    switch(action.type){
        case 'UPDATE_LOCATION':
            return {...state,currentLocation:action.currentLocation}
        default:
            return state
    }
}

export default LocationReducer;
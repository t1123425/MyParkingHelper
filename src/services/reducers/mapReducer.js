const initialState = {
    flyStatus:false,
    posArray:[]
}

const MapReducer = (state = initialState, action) => {
    switch(action.type){
        case 'Fly_TO_POSITION':
            return {...state,flyStatus:action.flyStatus,posArray:[...action.posArray]}
        case 'Reset_POSITION':
            return {flyStatus:false,posArray:[]}
        default:
            return state
    }
}

export default MapReducer;

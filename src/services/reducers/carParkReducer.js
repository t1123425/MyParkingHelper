const initialState = {
    carParkMarks:[],
    saveParkMarks:[]
}

const CarParkReducer = (state = initialState,action) => {
     switch(action.type){
         case 'UPDATE_CARPARKMARKS':
             if(state.carParkMarks.length > 0){
                return {...state,carParkMarks:[...state.carParkMarks,...action.markArray]}
             }else{
                return {...state,carParkMarks:[...action.markArray]}
             }
        case 'SAVE_PARKMARKS':
            if(state.carParkMarks.length > 0){
                return {...state,saveParkMarks:[...state.saveParkMarks,...action.markArray]}
            }else{
                return {...state,saveParkMarks:[...action.markArray]}
            }
        case 'RESET_PARKMARKS':
            return {...state,saveParkMarks:[]}
         default:
             return state
     }
}

export default CarParkReducer;
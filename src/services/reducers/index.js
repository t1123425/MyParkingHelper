import CarParkReducer from "./carParkReducer";
import LocationReducer from "./locationReducer";
import {combineReducers} from 'redux';

const allreducers = combineReducers({CarParkReducer,LocationReducer})

export default allreducers;
import CarParkReducer from "./carParkReducer";
import LocationReducer from "./locationReducer";
import {combineReducers} from 'redux';
import MapReducer from "./mapReducer";

const allreducers = combineReducers({CarParkReducer,LocationReducer,MapReducer})

export default allreducers;
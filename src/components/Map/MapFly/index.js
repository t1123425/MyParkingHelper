import React,{ useEffect } from 'react';
import {useMap} from 'react-leaflet';
import { useSelector, useDispatch} from 'react-redux';

const MapFly = () => {
    const uMap = useMap();
    const dispatch = useDispatch();
    const mapControl = useSelector((state) => state.MapReducer)
    useEffect(()=>{
        if(mapControl.flyStatus){
            uMap.flyTo(mapControl.posArray,17);
            dispatch({type:'Reset_POSITION'})
        }
        //console.log('useMAP',uMap);
        // console.log('mapControl',mapControl);
    },[mapControl])
    return null;
}

export default React.memo(MapFly);

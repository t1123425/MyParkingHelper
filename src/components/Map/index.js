import React,{useState,useEffect} from 'react';
import { MapContainer, TileLayer,ZoomControl} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import {getCarPark} from '../../api/api_service';
// import  twd97_to_latlng from '../../util/twd97Tolatlng';
import CarParkingMarker from './CarPakingMarker';
import ParkingMarker from './ParkingMarker';
import LocationMarker from './LocationMarker';
import { useSelector } from 'react-redux';
import {showErrorAlert} from '../../util/sweetAlert'
import ParkingMarkBtn from './AddParkingMarkBtn';
import L from 'leaflet';
// import RoutingMachine from './RoutineMachine';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
//center of taipei
const defaultprops = [25.03746, 121.564558];

async function getCarParkMapData(city){
  // the taipei parking limit is 263
  let data =  {
    $top:263,
    $format:'JSON'
  }
  try {
    return getCarPark(city,data).then(res => 
      res.data?.CarParks.map((e)=>{
        return {
          posArray:[e.CarParkPosition.PositionLat,e.CarParkPosition.PositionLon],
          Address:e.Address,
          CarParkName:e.CarParkName.Zh_tw,
          Description:e.Description,
          FareDescription:e.FareDescription
        }
      })
    )
    
  }catch(error){
    console.log('err',error);
    showErrorAlert('API Error');
    return [];
  }
}

const Map = React.memo(({posArray = defaultprops})=>{
        const [parkingArray,setParkArray] = useState([]);
        // const parkingMarkArray = useSelector((state) => state.CarParkReducer.carParkMarks)
        const savedMarkArray = useSelector((state) => state.CarParkReducer.saveParkMarks)
        useEffect(()=>{
          const getTaipeiParkData = async () => {
              const TaipeiParkData = await getCarParkMapData('Taipei');
              setParkArray([...TaipeiParkData]);
          }

          getTaipeiParkData();
        },[])
        return (
            <div className="w-full h-full">
                <MapContainer center={posArray} zoom={13} scrollWheelZoom={true} zoomControl={false} style={{height: '100vh'}}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <ZoomControl position="bottomright" />
                    <LocationMarker />
                    {/* <RoutingMachine /> */}
                    <ParkingMarker markArray={savedMarkArray} />
                    <CarParkingMarker markArray={parkingArray} />
                    <ParkingMarkBtn />
                </MapContainer>
            </div>
        )
})


export default Map;
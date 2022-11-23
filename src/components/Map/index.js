import React from 'react';
import { MapContainer, TileLayer,ZoomControl} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
// import  twd97_to_latlng from '../../util/twd97Tolatlng';
import CarParkingMarker from './CarPakingMarker';
import ParkingMarker from './ParkingMarker';
import LocationMarker from './LocationMarker';
import { useSelector } from 'react-redux';
import ParkingMarkBtn from './AddParkingMarkBtn';
import MapFly from './MapFly';
import L from 'leaflet';
import { useTranslation } from 'react-i18next';
// import RoutingMachine from './RoutineMachine';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
//center of taipei
const defaultprops = [25.03746, 121.564558];


const Map = React.memo(({posArray = defaultprops})=>{
        const {t} = useTranslation();
        const parkingMarkArray = useSelector((state) => state.CarParkReducer.carParkMarks)
        const savedMarkArray = useSelector((state) => state.CarParkReducer.saveParkMarks)
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
                    <ParkingMarker mapMsg={t('OpenGoogle')} markArray={savedMarkArray} />
                    <CarParkingMarker mapMsg={t('OpenGoogle')} markArray={parkingMarkArray} />
                    <ParkingMarkBtn />
                    <MapFly />
                </MapContainer>
            </div>
        )
})


export default Map;
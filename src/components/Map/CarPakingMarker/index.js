import {Marker,Popup} from 'react-leaflet'
import L from 'leaflet';
import parkSVG from '../../../assets/img/parkingLogo.svg'

function getCutstomIcon(_iconSize){
  return L.icon({
    iconUrl:parkSVG,
    iconSize:_iconSize
  })
}

const CarParkingMarker = props => {
    
   
    return !props.markArray || props.markArray.length === 0 ? null : (
        props.markArray.map((e,i)=> (
          <Marker key={i} position={e.posArray} icon={getCutstomIcon([30,30])}>
              <Popup>
                <p>{e.CarParkName}</p>
                <p>{e.Address}</p>
                <p>{e.Description}</p>
                <p>{e.FareDescription}</p>
                <a href={`https://www.google.com/maps/search/?api=1&query=${e.posArray[0]}%2C${e.posArray[1]}`}
                target="_blank" rel="noreferrer">
                   Open google Map For directing.
                </a>
              </Popup>
          </Marker>
        ))
     )
}
export default CarParkingMarker;
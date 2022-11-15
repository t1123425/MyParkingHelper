import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const CreateRoutineMachineLayer = (props) => {
  
    const instance = L.Routing.control({
         waypoints:[
            // L.latLng(props.beginGeo.lat,props.beginGeo.lng),
            // L.latLng(props.endGeo.lat,props.endGeo.lng)
            L.latLng(25.0475283, 121.4318217),
            L.latLng(25.03746, 121.564558)
         ],
         lineOptions: {
            styles: [{ color: "#FF0000", weight: 4 }]
          },
          show: false,
          addWaypoints: false,
          routeWhileDragging: true,
          draggableWaypoints: true,
          fitSelectedRoutes: true,
          showAlternatives: false
    })
    return instance;
}

const RoutingMachine = createControlComponent(CreateRoutineMachineLayer);

export default RoutingMachine;

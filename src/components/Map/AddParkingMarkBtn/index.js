import {useMap} from 'react-leaflet';
import { useDispatch,useSelector} from 'react-redux';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import {showErrorAlert} from '../../../util/sweetAlert';
import {LocationMarkerIcon,RefreshIcon} from '@heroicons/react/solid';
import { saveParkMarks, resetParkMarks } from '../../../services/actions';
import CButton from '../../CButton';

const ParkingMarkBtn = () => {
    const uMap = useMap();
    const dispatch = useDispatch();
    const addressPovider =  new OpenStreetMapProvider();
    const savedMarkArray = useSelector((state) => state.CarParkReducer.saveParkMarks)
    function saveLocation(){
      let savePosMarks = [];
      // if(currentLocation.length > 0){
      //   savePosMarks.push({
      //     posArray:currentLocation,
      //     info:'Your parking space'
      //   });
      //   dispatch(saveParkMarks(savePosMarks));
      // }else{
        
      // }
      uMap.locate().on('locationfound',async (e)=>{
        const results = await addressPovider.search({ query:''+e.latlng.lat+','+e.latlng.lng });
          savePosMarks.push({
            posArray:[e.latlng.lat,e.latlng.lng],
            info:results[0].label
          })
          dispatch(saveParkMarks(savePosMarks))
      }).on('locationerror',(err)=>{
         console.log('err',err);
         showErrorAlert('location Error')
      })
      
    }
    function focusMarkLocation(){
       if(savedMarkArray.length > 0){
        uMap.flyTo(savedMarkArray[0].posArray,17)
       }
    }
    function resetParkMark(){
      dispatch(resetParkMarks())
    }
    const renderBtn = () => {
        if(savedMarkArray.length > 0){
            return ( 
               <div className='flex flex-col'>
                  <CButton text={'Focus parking mark'}
                   bgColor={'bg-green-500'}
                   element={<LocationMarkerIcon  className='w-10 inline-block'/>}
                   btnClick={()=>{focusMarkLocation()}}
                    />
                  <CButton text={'I arrived parking area, Reset the parking mark'} 
                    bgColor={'bg-orange-600'} 
                    element={<RefreshIcon  className='w-10 inline-block'/>}
                    btnClick={()=>{resetParkMark()}}/>
               </div>
                )
        }else{
            return <CButton text={'Save Current Position as Parking Mark'} 
                    bgColor={'bg-blue-600'} 
                    element={<LocationMarkerIcon  className='w-10 inline-block'/>}
                    btnClick={()=>{saveLocation()}}/>
        }
    }
    
    return (
        <div className='addParkBtnWrap text-center'>
          {
              renderBtn()
          }
        </div>
      )
    
  }
  export default ParkingMarkBtn;
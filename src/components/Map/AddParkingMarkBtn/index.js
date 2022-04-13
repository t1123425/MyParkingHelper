import {useMap} from 'react-leaflet';
import { useDispatch,useSelector} from 'react-redux';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import {showErrorAlert} from '../../../util/sweetAlert';
import {LocationMarkerIcon,RefreshIcon} from '@heroicons/react/solid';
import CButton from '../../CButton';
const ParkingMarkBtn = () => {
    const uMap = useMap();
    const Dispatch = useDispatch();
    const addressPovider =  new OpenStreetMapProvider();
    const savedMarkArray = useSelector((state) => state.CarParkReducer.saveParkMarks)

    function saveLocation(){
      uMap.locate().on('locationfound',async (e)=>{
        
        const results = await addressPovider.search({ query:''+e.latlng.lat+','+e.latlng.lng });
        const saveMarkarray = [{
          posArray:[e.latlng.lat,e.latlng.lng],
          info:results[0].label
        }]
        //console.log('saveMarkarray',saveMarkarray);
         
        Dispatch({
            type:'SAVE_PARKMARKS',
            markArray:saveMarkarray
        })
        
      }).on('locationerror',(err)=>{
         console.log('err',err);
         showErrorAlert('location Error')
      })
      
      
    }
    function resetParkMark(){
        Dispatch({
            type:'RESET_PARKMARKS'
        })
    }
    const renderBtn = () => {
        if(savedMarkArray.length > 0){
            return <CButton text={'I arrived parking area, Reset the parking mark'} 
                    bgColor={'bg-orange-600'} 
                    element={<RefreshIcon  className='w-10 inline-block'/>}
                    btnClick={()=>{resetParkMark()}}/>
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
import {useMap} from 'react-leaflet';
import { useDispatch,useSelector} from 'react-redux';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import {showErrorAlert} from '../../../util/sweetAlert';
import {LocationMarkerIcon,RefreshIcon} from '@heroicons/react/solid';
import { saveParkMarks, resetParkMarks } from '../../../services/actions';
import CButton from '../../CButton';
import { useTranslation } from 'react-i18next';

const ParkingMarkBtn = () => {
    const {t} = useTranslation();
    const uMap = useMap();
    const dispatch = useDispatch();
    const addressPovider =  new OpenStreetMapProvider();
    const savedMarkArray = useSelector((state) => state.CarParkReducer.saveParkMarks)
    const locationPosition = useSelector((state) => state.LocationReducer.currentLocation)
    async function saveLocation(){
      let savePosMarks = [];
      if(locationPosition.length > 0){
        const results = await addressPovider.search({ query:''+locationPosition[0]+','+locationPosition[1] });
        savePosMarks.push({
          posArray:locationPosition,
          info:results[0].label
        });
        dispatch(saveParkMarks(savePosMarks));
      }else{
        showErrorAlert(t('NoLocation'))
      }
      
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
               <div className='flex justify-center md:flex-row flex-col'>
                {/* Focus Parking Mark */}
                  <CButton text={t('FocusMark')}
                   bgColor={'bg-green-500'}
                   element={<LocationMarkerIcon  className='w-10 inline-block'/>}
                   btnClick={()=>{focusMarkLocation()}}
                    />
                    {/* I arrived parking area, Reset the parking mark */}
                  <CButton text={t('ArriveMark')} 
                    bgColor={'bg-orange-600'} 
                    element={<RefreshIcon  className='w-10 inline-block'/>}
                    btnClick={()=>{resetParkMark()}}/>
               </div>
                )
        }else{
            // Save Current Position as Parking Mark
            return <CButton text={t('SaveMark')} 
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
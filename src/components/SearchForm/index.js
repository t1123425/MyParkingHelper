import { useState,useEffect,useContext} from "react"
import { useDispatch,useSelector} from 'react-redux';
import {getCarPark} from '../../api/api_service';
import {showErrorAlert} from '../../util/sweetAlert'
import { useTranslation } from "react-i18next"
import {LocationMarkerIcon} from '@heroicons/react/solid';
import { MenuStatusContext } from "../../context";
import { updateCarParkMarks,mapFlyControl } from "../../services/actions";
// import { map } from 'leaflet';
const SearchForm = ()=>{
    const {t} = useTranslation();
    const {setOpen} = useContext(MenuStatusContext);
    // console.log(useSelector((state) => state.CarParkReducer));
    const parkingMarkArray = useSelector((state) => state.CarParkReducer.carParkMarks)
    const cityArray = [
        "Taipei",
        "Tainan",
        "Keelung",
        "Hsinchu",
        "MiaoliCounty",
        "NantouCounty",
        "ChiayiCounty",
        "Chiayi",
        "PingtungCounty",
        "HualienCounty",
        "TaitungCounty",
        "KinmenCounty",
        "LienchiangCounty"
    ]

    const [searchValue,setSearchValue] = useState('');
    const [resultList,SetResultList] = useState([]);
    const searchParks = () => {
        const filtersResult =  parkingMarkArray.filter(e => e.CarParkName.includes(searchValue))
        SetResultList(() => [...filtersResult]);
    }
    // const uMap = useMap();
    const Dispatch = useDispatch();
    const getCityCarPark = (city) =>{
        const data = {
            $format:'JSON'
        } 
        getCarPark(city,data).then((res)=>{
            //console.log('get car park',res);
            const filterCarMarkArray = res.data?.CarParks.map((e,i)=>{
                return {
                 posArray:[e.CarParkPosition.PositionLat,e.CarParkPosition.PositionLon],
                 Address:e.Address,
                 CarParkName:e.CarParkName.Zh_tw,
                 Description:e.Description,
                 FareDescription:e.FareDescription,
                 parkId:i
                }
              })
              
              Dispatch(updateCarParkMarks(filterCarMarkArray))

        }).catch((err)=>{
            console.log('car park err',err);
            showErrorAlert('car park api error');
        })
    }
    const focusPark = (posArray) => {
        //uMap.flyTo(posArray,17);
        //L.map.flyTo(posArray,17);
        Dispatch(mapFlyControl({flyStatus:true,posArray:posArray}))
        // map.flyTo(posArray);
        setOpen(false)
    }
    useEffect(()=>{
        getCityCarPark(cityArray[0]);
    },[])
    return (
        <div className="formBlock bg-slate-100 rounded p-3">
            <h3 className="font-bold leading-tight text-4xl">{t('SearchParkTitle')}</h3>
            <div className="mt-6 md:col-span-2"> 
                <div className="w-full">
                    {/* <select id="citySelect" 
                      onChange={handleSelect}
                      defaultValue={searchValue}
                      className="form-select 
                        appearance-none 
                        w-full 
                        rounded
                        font-normal
                      text-gray-700
                      bg-white
                        mt-2">
                        {
                            parkingMarkArray.length > 0?parkingMarkArray.map((e,i)=>{
                                return (
                                    <option key={i} value={e.parkId} >{e.CarParkName+'-'+e.Address}</option>
                                )
                            }):<option>No data</option>
                        }
                    </select> */}
                    <input type="text"
                    value={searchValue}
                    placeholder={t('SelectLabel')}
                    onChange={(e)=>{setSearchValue(e.target.value)}}
                    className="form-control 
                    block 
                    w-full 
                    px-3 
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />

                </div>
                <div className="flex space-x-2 mt-2">
                    <button type="button" onClick={searchParks} className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Search</button>
                </div>
            </div>
            <div className="mt-6 md:col-span-2">
                <div className="flex justify-center resultWrap overflow-auto">
                    <ul className="rounded-lg w-96 ">
                    {
                        resultList.length > 0 ? resultList.map((e,i)=>{
                            return (
                                <li key={i} onClick={()=>{focusPark(e.posArray)}} className={'flex items-center text-gray-900 flex-wrap flex-shrink-0 flex-grow-0 px-6 py-2 border-b border-gray-200 w-full cursor-pointer hover:text-blue-600'}>
                                    <LocationMarkerIcon style={{width:'25px'}} className='inline-block' />
                                    <span style={{width:'calc(100% - 25px)'}}>{e.CarParkName+'-'+e.Address}</span>
                                </li>
                            )
                        }):null
                    }
                    </ul>
                </div>
                
            </div>
        </div>
    )
}

export default SearchForm;
import { useState} from "react"
import { useDispatch} from 'react-redux';
import {getCarPark} from '../../api/api_service';
import {showErrorAlert} from '../../util/sweetAlert'
import { useTranslation } from "react-i18next"
const SearchForm = ()=>{
    const {t} = useTranslation();
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
    const [selectCity,getSelectCity] = useState(cityArray[0]);

    const handleSelect = (e) => {
        getSelectCity(e.target.value);
    }
    const Dispatch = useDispatch();
    const getSearchResult = () =>{
        const data = {
            $format:'JSON'
        }
        getCarPark(selectCity,data).then((res)=>{
            //console.log('get car park',res);
            
            const filterCarMarkArray = res.data?.CarParks.map((e)=>{
                return {
                 posArray:[e.CarParkPosition.PositionLat,e.CarParkPosition.PositionLon],
                 Address:e.Address,
                 CarParkName:e.CarParkName.Zh_tw,
                 Description:e.Description,
                 FareDescription:e.FareDescription
                }
              })
              
              Dispatch({
                  type:'UPDATE_CARPARKMARKS',
                  markArray:filterCarMarkArray
              })

        }).catch((err)=>{
            console.log('car park err',err);
            showErrorAlert('car park api error');
        })
    }
    
    return (
        <div className="formBlock bg-slate-100 rounded p-3">
            <h3 className="font-bold leading-tight text-4xl">{t('SearchParkTitle')}</h3>
            <div className="mt-6 md:col-span-2"> 
                <div className="w-full">
                    <label htmlFor="citySelect" className="form-label mt-2">{t('SelectCity')}</label>
                    <select id="citySelect" 
                      onChange={handleSelect}
                      value={selectCity}
                      className="form-select 
                        appearance-none 
                        w-full 
                        rounded
                        font-normal
                      text-gray-700
                      bg-white
                        mt-2">
                        {
                            cityArray.map((e,i)=>{
                                return (
                                    <option key={i} >{e}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="flex space-x-2 mt-2">
                    <button type="button" onClick={getSearchResult} className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Search</button>
                </div>
                {/* <form action="#" method="POST">
                     <div className="shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 w-full">
                            <div className="w-full">
                                <div className="col-span-12 sm:col-span-3">
                                    <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search Input</label>
                                    <input type="text" name="" id="search" className="text-gray-700 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                </div>
                            </div>
                        </div>
                     </div>
                </form> */}
            </div>
        </div>
    )
}

export default SearchForm;
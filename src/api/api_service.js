import axios from 'axios';
 
  //Note: You must create custom environment variables beginning with REACT_APP_
 const ApiService = axios.create({
  headers: { 'Content-Type': 'application/json' },
  timeout:1500
 })
 //request interceptor
 ApiService.interceptors.request.use(
   function(config){
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
 )
//response interceptor
ApiService.interceptors.response.use(
  (response)=>{
    // Do something with response data
    return response;
},(error)=>{
  if (error.response){
    switch (error.response.status) {
      case 404:
        console.log("你要找的頁面不存在")
        // go to 404 page
        break
      case 500:
        console.log("api發生問題")
        // go to 500 page
        break
      default:
        console.log(error.message)
    }
  } 
  if (!window.navigator.onLine) {
    alert("網路出了點問題，請重新連線後重整網頁");
    return;
  }
  return Promise.reject(error);
})
//oas api doc: https://traffic.transportdata.tw/MOTC/v1/Parking/api-docs/oas
/**
 * 
 * @param {*} dataType 資料類型(reqired) ex: CarPark (停車場基本資料)
 * @param {*} city 城市名(reqired) ex:'Taipei' 
 * @param {*} dataObj 資料欄位 ex: {$top:30,$format:'JSON'}
 * @dataObj
 *   $select:挑選
 *   $filter:過濾
 *   $orderby:排序
 *   $top:取前幾筆
 *   $skip:跳過前幾筆
 *   $count:查詢數量
 *   $format:(reqired)指定來源格式
 */
//OffStreet為停車場資料
const getOffStreetData = (dataType,city,dataObj,config) =>{
   if(config){
    ApiService.defaults.headers['If-Modified-Since'] = config.date;
   }
  //  ApiService.defaults.baseURL = process.env.REACT_APP_MOTC_API_DOMAIN;
  //ApiService.defaults.baseURL = '/nptgov';
   return  ApiService.get(`${process.env.REACT_APP_MOTC_API_DOMAIN}/v1/Parking/OffStreet/${dataType}/City/${city}`,{params:dataObj});
}
const getNewTaipeiCity = (dataObj) => {
  //ApiService.defaults.baseURL = '/nptgov';
  return  ApiService.get(`/api/datasets/B1464EF0-9C7C-4A6F-ABF7-6BDF32847E68/json`,{params:dataObj});
}
//onStreet為路邊停車場資料
//取得指定[縣市]之"停車場"車位數資料 (以台北市為例)
export const getParkingSpace = (city = 'Taipei',data,config) => getOffStreetData('ParkingSpace',city,data,config)
//取得指定[縣市]之"停車場"基本資料
export const getCarPark = (city = 'Taipei',data,config) => getOffStreetData('CarPark',city,data,config)
//取得新北市之停車場 "基本資料"
/**
 * data:
 * page (頁碼 0..N)
 * size (每頁筆數)
 */
export const getNTPCarPark = (data) => getNewTaipeiCity(data);

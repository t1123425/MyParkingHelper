import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

i18next.use(initReactI18next).use(LanguageDetector).init({
    debug:true,
    fallbackLng:'ch',
    resources:{
        en:{
            translation:{
                NoLocation:'No Location',
                FocusMark:'Focus Parking Mark',
                ArriveMark:'I arrived parking area, Reset the parking mark',
                SaveMark:'Save Current Position as Parking Mark',
                OpenGoogle:' Open google Map For directing.',
                ToggleLanguage:'Language Toggle',
                SearchParkTitle:'Search Parking location',
                SelectLabel:'Select Park Area'
            }
        },
        ch:{
            translation:{
                NoLocation:'未載入座標。',
                FocusMark:'鎖定停車座標。',
                ArriveMark:'已到達停車位，重製車位位置。',
                SaveMark:'儲存現有座標為停車位置。',
                OpenGoogle:'使用Google地圖來導航。',
                ToggleLanguage:'切換語言',
                SearchParkTitle:'搜尋停車位置',
                SelectLabel:'選擇停車場'
            }
        }
    } 
})
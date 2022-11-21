import { useState} from "react"
import { useTranslation } from "react-i18next"

const LangToggle = () => {
    const {t,i18n} = useTranslation()
    const lngs = {
        en: {text:'EN',bgColor:'bg-blue-600'},
        ch: {text:'中文',bgColor:'bg-violet-600'},
    }

    return (
        <div className="flex bg-slate-100 rounded p-3 mb-3">
            <p className="font-bold m-3">
                {t("ToggleLanguage")} :
            </p>
             {
                Object.keys(lngs).map((e,i)=>{
                    return (
                        <button type="submit" onClick={() => i18n.changeLanguage(e) } key={i} className={"p-3 mx-2 font-medium text-xs rounded-full text-white " + lngs[e].bgColor} >
                            {
                                lngs[e].text
                            }
                        </button>
                    )
                })
             }
        </div>
    )
}

export default LangToggle;
import React, {useState,useEffect,Fragment}from "react"
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { useTranslation } from "react-i18next"

const lngsArray = [
    {
        lang:'en',
        text:'English'
    },
    {
        lang:'ch',
        text:'中文'
    }
]
const LangToggle = () => {
    const [selected, setSelected] = useState(lngsArray[0])
    const {t,i18n} = useTranslation()
    // const lngs = {
    //     en: {text:'EN',bgColor:'bg-blue-600'},
    //     ch: {text:'中文',bgColor:'bg-violet-600'},
    // }
    useEffect(()=>{
        i18n.changeLanguage(selected.lang)
    },[selected])
    return (
        <div className="flex items-center bg-slate-100 rounded p-3 mb-3">
            <span className="font-bold  mr-2">
                {t("ToggleLanguage")} :
            </span>
            <div className="w-3/4">
                <Listbox value={selected} onChange={setSelected}>
                     <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span className="block truncate">{selected.text}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                            </span>
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {lngsArray.map((langs, i) => (
                                    <Listbox.Option
                                    key={i}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                        }`
                                    }
                                    value={langs}
                                    >
                                    {({ selected }) => (
                                        <>
                                        <span
                                            className={`block truncate ${
                                            selected ? 'font-medium' : 'font-normal'
                                            }`}
                                        >
                                            {langs.text}
                                        </span>
                                        {selected ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        ) : null}
                                        </>
                                    )}
                                    </Listbox.Option>
                                ))}
                                </Listbox.Options>
                        </Transition>
                     </div>
                </Listbox>
            </div>
             {/* {
                Object.keys(lngs).map((e,i)=>{
                    return (
                        <button type="submit" onClick={() => i18n.changeLanguage(e) } key={i} className={"p-3 mx-1 font-medium text-xs rounded-md text-white " + lngs[e].bgColor} >
                            {
                                lngs[e].text
                            }
                        </button>
                    )
                })
             } */}
        </div>
    )
}

export default React.memo(LangToggle);
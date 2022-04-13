import {MapIcon,MenuIcon,XIcon} from '@heroicons/react/solid'
import Nav from '../nav'
import { useState } from 'react'

function renderIcon(status){
   if(status){
      return <XIcon className='w-10'/>
    }else{
      return  <MenuIcon className='w-10' />
    }
}
const  Header = () =>{
     const [isOpen,setOpen] = useState(false);
     return (
        <header className="headerContent w-full fixed top-0 left-0 bg-white shadow">
           <p className='text-blue-600 ml-1 text-sm'>
              Version: {process.env.REACT_APP_VERSION}
           </p>
           <div className='flex p-8 pt-0 w-full justify-between items-center z-10'>
               <div className="menuBtnBlock cursor-pointer opacity-0" onClick={() => setOpen((isOpen)=> !isOpen)}>
                  {
                     renderIcon(isOpen)
                  }
               </div>
               <div className="flex logoBlock text-blue-500 items-center">
                  <MapIcon className="w-5" />
                     <h1 className='font-bold ml-4 inline-block'>
                        {
                           process.env.REACT_APP_WEBSITE_NAME
                        }
                     </h1>
               </div>
           </div>
           <Nav Isopen={isOpen}/>
        </header>
     )
}

export default Header;
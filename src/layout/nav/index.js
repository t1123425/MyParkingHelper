// import { Transition } from '@headlessui/react'
import SearchForm from '../../components/SearchForm';
import LangToggle from '../../components/langToggle';
import { useContext } from 'react';
import { MenuStatusContext } from '../../context';
const Nav = () =>{
    const {isOpen} = useContext(MenuStatusContext);
    return (
        <nav className={'navMenu transition-all w-1/2 p-2 h-screen relative top-0 rounded shadow bg-slate-400 '+(isOpen?'active':'')}>
            <LangToggle />
            <SearchForm />
        </nav>
    )
}

export default Nav
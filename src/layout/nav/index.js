// import { Transition } from '@headlessui/react'
import SearchForm from '../../components/SearchForm';
import LangToggle from '../../components/langToggle';
const Nav = ({Isopen}) =>{
    return (
        <nav className={'navMenu transition-all w-1/2 p-2 h-screen relative top-0 rounded shadow bg-slate-400 '+(Isopen?'active':'')}>
            <LangToggle />
            <SearchForm />
        </nav>
    )
}

export default Nav
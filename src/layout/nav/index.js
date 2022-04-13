// import { Transition } from '@headlessui/react'
import SearchForm from '../../components/SearchForm';
const Nav = ({Isopen}) =>{
    return (
        <nav className={'navMenu transition-all w-1/2 p-2 h-screen relative top-0 rounded shadow bg-slate-400 '+(Isopen?'active':'')}>
            <SearchForm />
            {/* <h2 className='mt-5 border-t'>Links:</h2>
            <ul>
                <li>

                </li>
            </ul> */}
        </nav>
    )
}

export default Nav
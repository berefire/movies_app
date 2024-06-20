import logo from '../assets/netflix-logo.png';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { VscAccount } from 'react-icons/vsc';
import { IoSearchOutline } from 'react-icons/io5';
import { navigation } from '../constants/navigation.js';


const Header = () => {
    const location = useLocation();
    const removeSpace = location?.search?.slice(3)?.split("%20").join(" ");
    const [searchInput, setSearchInput] = useState(removeSpace);
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(searchInput){
            navigate(`/search?q=${searchInput}`);
        }
    }, [searchInput]);

    const handleSubmit = (e) => {
        e.preventDefault()
    };

  return (
    <header className='fixed top-0 w-full h-16 bg-black bg-opacity-50 z-40'>
        <div className='container mx-auto px-3 flex items-center h-full'>
            <div>
                <Link to={"/"}>
                    <img 
                        src={logo}
                        alt='logo'
                        width={120}
                    />
                </Link>
            </div>
                <nav className='hidden lg:flex items-center gap-1 ml-5'>
                    {navigation.map((nav, index) => {
                        return (
                            <div key={nav.label+"header"+index}>
                                <NavLink
                                    to={nav.href}
                                    className={({ isActive }) => `px-2 hover:text-neutral-100 ${isActive && "text-neutral-100"}`}>
                                    {nav.label}
                                    </NavLink>
                            </div>
                        );
                    })}
                </nav>

                <div className='ml-auto flex items-center gap-5'>
                    <form className='flex items-center gap-2' onSubmit={handleSubmit}>
                        <input 
                            type='text'
                            placeholder='Search...'
                            className='bg-transparent px-4 py-1 outline-none border-none hidden lg:block'
                            onChange={(e) => setSearchInput(e.target.value)}
                            value={searchInput}
                        />
                        <button className='text-2xl text-white gap-5'>
                            <IoSearchOutline />
                        </button>
                    </form>
                    <div className='w-8 h-8 overflow-hidden cursor-pointer active:scale-50 transition-all'>
                        <VscAccount className='w-full h-full'/>
                    </div>

                </div>
        </div>
    </header>
  )
}

export default Header
import React from 'react';
import { mobileNavigation} from '../constants/navigation';
import { NavLink } from 'react-router-dom';
import { MdHomeFilled } from 'react-icons/md';
import { PiTelevisionFill } from 'react-icons/pi';
import { BiSolidMoviePlay } from 'react-icons/bi';
import { IoSearchOutline } from 'react-icons/io5';


const icons = {
    PiTelevisionFill,
    BiSolidMoviePlay,
    MdHomeFilled,
    IoSearchOutline,
};


const MobileNavigation = () => {
  return (
    <section className='lg:hidden h-14 bg-black bg-opacity-70 backdrop-blur-2xl fixed bottom-0 w-full z-40'>
        <div className='flex items-center justify-between h-full text-neutral-400'>
            {
                mobileNavigation.map((nav) => {
                    const IconComponent = icons[nav.icon];
                    return(
                        <div key={nav.label+"mobilenavigation"} className='text-2xl'>
                        <NavLink
                            to={nav.href}
                            className={({isActive})=>`px-3 flex h-full items-center flex-col justify-center ${isActive && "text-white"}`}

                        >
                            {IconComponent && <IconComponent />}
                            <p className='text-sm'>{nav.label}</p>
                        </NavLink>
                        </div>
                    )
                })
            }
        </div>
    </section>
  )
}

export default MobileNavigation;
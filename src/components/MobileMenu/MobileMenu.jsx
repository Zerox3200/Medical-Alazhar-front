import React from 'react'
import './MobileMenu.scss'
import { NavLink } from 'react-router';
import { IoClose } from "react-icons/io5";
import { motion } from 'framer-motion';

export default function MobileMenu({ onClose }) {

    const navLinks = [
        {
            title: "home",
            label: "Home",
        },
        {
            title: "about",
            label: "About",
        },
        {
            title: "courses",
            label: "Courses",
        },
        {
            title: "contact_us",
            label: "Contact Us",
        },
    ];


    return <motion.div className='mobile-menu' onClick={onClose} initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }}
        transition={{ duration: 0.3 }}>
        <IoClose className='mobile-menu__close' onClick={onClose} />
        <div className='mobile-menu__content' onClick={(e) => e.stopPropagation()}>
            <ul className='mobile-menu__list'>
                {navLinks.map((navLink, i) => (
                    <li key={i} className='mobile-menu__item'>
                        <NavLink to={navLink.title === "home" ? "/" : `/${navLink.title}`} className='mobile-menu__link' onClick={onClose}>{navLink.label}</NavLink>
                    </li>
                ))}
            </ul>
        </div>
    </motion.div>

}

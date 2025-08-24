import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import logo from "../../assets/images/logo.jpg";
import './MainNavbar.scss'
import { IoMdMenu } from "react-icons/io";
import MobileMenu from "../MobileMenu/MobileMenu";
import { AnimatePresence } from "framer-motion";

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

const MainNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <>
    <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container">
        {/* Logo */}
        <div className="navbar__logo">
          <Link to="/">
            <img src={logo} alt="Medical Interns" className="navbar__logo-img" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar__nav">
          <ul className="navbar__nav-list">
            {navLinks.map((navLink, i) => (
              <li key={i} className="navbar__nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `navbar__nav-link ${isActive ? 'navbar__nav-link--active' : ''}`
                  }
                  to={navLink.title === "home" ? "/" : `/${navLink.title}`}
                >
                  {navLink.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <div className="navbar__cta">
          <Link to="/auth/login" className="navbar__cta-button">
            Get Started
          </Link>
          <IoMdMenu className="mobile-icon" onClick={toggleMobileMenu} />
        </div>
      </div>
    </nav>
    <AnimatePresence>
      {isMobileMenuOpen && <MobileMenu onClose={toggleMobileMenu} />}
    </AnimatePresence>
  </>
};

export default MainNavbar;

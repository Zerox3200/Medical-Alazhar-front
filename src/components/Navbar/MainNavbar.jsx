import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";
import './MainNavbar.scss'
import { IoMdMenu } from "react-icons/io";
import MobileMenu from "../MobileMenu/MobileMenu";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useLogoutMutation } from "../../services/common/authApiSlice";

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
    title: "contact",
    label: "Contact Us",
  },
];

const MainNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [Token, , removeCookies] = useCookies(['Al-Azhar']);
  const { user } = useSelector((state) => state.auth);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      removeCookies('Al-Azhar', { path: '/' });
      navigate("/auth/login");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDashboard = () => {
    if (user?.role === "admin") {
      navigate("/admin");
    } else if (user?.role === "supervisor") {
      navigate("/supervisor/dashboard");
    } else {
      navigate("/");
    }
  }

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
        <div className="navbar__cta flex items-center gap-4">
          {Token['Al-Azhar'] ? <>
            <button onClick={handleDashboard} className="navbar__cta-button">
              Dashboard
            </button>
            <button onClick={handleLogout} className="navbar__cta-button">
              Logout
            </button>
          </> : <>
            <Link to="/auth/login" className="navbar__cta-button">
              Login
            </Link>
            <Link to="/auth/signup" className="navbar__cta-button">
              Register
            </Link>
          </>
          }
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

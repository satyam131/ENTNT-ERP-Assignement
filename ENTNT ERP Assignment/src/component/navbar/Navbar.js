import React from 'react';
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRef } from 'react';

function Navbar() {
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    };

    return (
        <div className="navbar">
            <header>
                <NavLink to="/" id='dashboard-icon' style={{ color: "rgb(255, 255, 194)" }}>
                    ENTNT ERP SYSTEM
                </NavLink>

                <nav ref={navRef}>
                    <NavLink onClick={showNavbar} to="/" className="nav-element" activeClassName="active">
                        <p>Dashboard</p>
                    </NavLink>

                    <NavLink onClick={showNavbar} to="/items" className="nav-element" activeClassName="active">
                        <p>Items</p>
                    </NavLink>

                    <NavLink onClick={showNavbar} to="/orders" className="nav-element" activeClassName="active">
                        <p>Orders</p>
                    </NavLink>

                    <NavLink onClick={showNavbar} to="/calender" className="nav-element" activeClassName="active">
                        <p>Calendar</p>
                    </NavLink>

                    <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                        <FaTimes />
                    </button>
                </nav>

                <button className="nav-btn" onClick={showNavbar}>
                    <FaBars />
                </button>
            </header>
        </div>
    );
}

export default Navbar;

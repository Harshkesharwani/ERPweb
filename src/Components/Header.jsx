import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../Assets/erp.png';
import Profile from '../Assets/man.png';

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('userProfile');
        navigate('/');
    };

    return (
        <header className="sticky top-0 left-0 w-full bg-white shadow-md z-10">
            <div className="container mx-auto flex justify-between items-center p-4 pl-20">
                <img src={logo} alt="Logo" className="w-10 h-10" />
                <input
                    type="text"
                    placeholder="Search"
                    className="bg-gray-200 rounded-full px-4 py-2 flex-1 mx-4"
                />
                <div className="relative">
                    <img
                        src={Profile}
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full cursor-pointer"
                        onClick={toggleDropdown}
                    />
                    {isDropdownOpen && (
                        <div
                            className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg"
                            onMouseLeave={closeDropdown}
                        >
                            <button
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                onClick={() => { /* Handle Settings click */ }}
                            >
                                Settings
                            </button>
                            <button
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;

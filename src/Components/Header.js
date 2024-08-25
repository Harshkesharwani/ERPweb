import React from 'react';
import logo from '../Assets/erp.png';
import Profile from '../Assets/man.png';

const Header = () => {
    return (
        <header className="sticky top-0 left-0 w-full bg-white shadow-md z-10">
            <div className="container mx-auto flex justify-between items-center p-4 pl-20">
                <img src={logo} alt="Logo" className="w-10 h-10" />
                <input
                    type="text"
                    placeholder="Search"
                    className="bg-gray-200 rounded-full px-4 py-2 flex-1 mx-4"
                />
                <img src={Profile} alt="User Avatar" className="w-10 h-10 rounded-full" />
            </div>
        </header>
    );
};

export default Header;

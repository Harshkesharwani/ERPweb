// src/Sidebar.js
import React, { useState } from 'react';
import {
    Menu, Close, Dashboard, School, People, ContactMail, MonetizationOn, Assignment, Replay, Receipt, LibraryBooks, AssignmentTurnedIn, ListAlt, Event, Today, CalendarToday, Commute, Hotel, LocalLibrary
} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`flex ${isOpen ? 'w-64' : 'w-16'} bg-primary h-screen pt-4 flex-col`}>
            <IconButton onClick={toggleSidebar} className="text-white mb-4 absolute top-0 right-0 z-50">
                {isOpen ? <Close /> : <Menu />}
            </IconButton>
            <div className="flex flex-col flex-grow mt-6">
                <div className='hover:bg-slate-800 px-2 py-2 rounded'>
                    <Link to="/Teacher/Teacher-Dashboard" className="flex items-center text-white mx-2">
                        <Dashboard />
                        {isOpen && <span className="ml-4">Dashboard</span>}
                    </Link>
                </div>
                <div className='hover:bg-slate-800 px-2 py-2 rounded'>
                    <Link to="/Teacher/Teacher-Attendence" className="flex items-center text-white mx-2">
                        <AssignmentTurnedIn />
                        {isOpen && <span className="ml-4">Attendance</span>}
                    </Link>
                </div>
                <div className='hover:bg-slate-800 px-2 py-2 rounded'>
                    <Link to="/Teacher/Teacher-StuAttendence" className="flex items-center text-white mx-2">
                        <AssignmentTurnedIn />
                        {isOpen && <span className="ml-4"> Student Attendance</span>}
                    </Link>
                </div>
                <div className='hover:bg-slate-800 px-2 py-2 rounded'>
                    <Link to="/Teacher/Teacher-Student" className="flex items-center text-white mx-2">
                        <School />
                        {isOpen && <span className="ml-4">Student</span>}
                    </Link>
                </div>
                <div className='hover:bg-slate-800 px-2 py-2 rounded'>
                    <Link to="/Teacher/Teacher-Enquiry" className="flex items-center text-white mx-2">
                        <ContactMail />
                        {isOpen && <span className="ml-4">Enquiry</span>}
                    </Link>
                </div>
                <div className='hover:bg-slate-800 px-2 py-2 rounded'>
                    <Link to="/Teacher/Student-Fees" className="flex items-center text-white mx-2">
                        <MonetizationOn />
                        {isOpen && <span className="ml-4">Accounts</span>}
                    </Link>
                </div>
                {/* <div className='hover:bg-slate-800 px-2 py-2 rounded'>
                    <Link to="/Teacher/Student-Dues" className="flex items-center text-white mx-2">
                        <Replay />
                        {isOpen && <span className="ml-4">Dues</span>}
                    </Link>
                </div>
                <SidebarItem icon={<Receipt />} title="Refund" isOpen={isOpen} /> */}
                <div className='hover:bg-slate-800 px-2 py-2 rounded'>
                    <Link to="/Teacher/Teacher-Certificate" className="flex items-center text-white mx-2">
                        <LibraryBooks />
                        {isOpen && <span className="ml-4">Certificate</span>}
                    </Link>
                </div>
                <div className='hover:bg-slate-800 px-2 py-2 rounded'>
                    <Link to="/Teacher/Teacher-Examination" className="flex items-center text-white mx-2">
                        <Assignment />
                        {isOpen && <span className="ml-4">Examination</span>}
                    </Link>
                </div>
                <div className='hover:bg-slate-800 px-2 py-2 rounded'>
                    <Link to="/Teacher/Teacher-Homework" className="flex items-center text-white mx-2">
                        <ListAlt />
                        {isOpen && <span className="ml-4">Homework</span>}
                    </Link>
                </div>
                <div className='hover:bg-slate-800 px-2 py-2 rounded'>
                    <Link to="/Teacher/Teacher-Setpaper" className="flex items-center text-white mx-2">
                        <School />
                        {isOpen && <span className="ml-4">SetPaper</span>}
                    </Link>
                </div>
                {/* <div className='hover:bg-slate-800 px-2 py-2 rounded'>
                    <Link to="/Teacher/Teacher-Result" className="flex items-center text-white mx-2">
                        <AssignmentTurnedIn />
                        {isOpen && <span className="ml-4">Result</span>}
                    </Link>
                </div> */}
                <div className='hover:bg-slate-800 px-2 py-2 rounded'>
                    <Link to="/Teacher/TimeTable" className="flex items-center text-white mx-2">
                        <Event />
                        {isOpen && <span className="ml-4">Time-Table</span>}
                    </Link>
                </div>
                <div className='hover:bg-slate-800 px-2 py-2 rounded'>
                    <Link to="/Teacher/Events" className="flex items-center text-white mx-2">
                        <Today />
                        {isOpen && <span className="ml-4">Event</span>}
                    </Link>
                </div>
                <div className='hover:bg-slate-800 px-2 py-2 rounded'>
                    <Link to="/Teacher/Holiday" className="flex items-center text-white mx-2">
                        <CalendarToday />
                        {isOpen && <span className="ml-4">Holiday</span>}
                    </Link>
                </div>
                <div className='hover:bg-slate-800 px-2 py-2 rounded'>
                    <Link to="/Teacher/Leaves" className="flex items-center text-white mx-2">
                        <Replay />
                        {isOpen && <span className="ml-4">leave</span>}
                    </Link>
                </div>
                <div className='hover:bg-slate-800 px-2 py-2 rounded'>
                    <Link to="/Teacher/Buses" className="flex items-center text-white mx-2">
                        <Commute />
                        {isOpen && <span className="ml-4">Bus</span>}
                    </Link>
                </div>
                <div className='hover:bg-slate-800 px-2 py-2 rounded'>
                    <Link to="/Teacher/Hostel" className="flex items-center text-white mx-2">
                        <Hotel />
                        {isOpen && <span className="ml-4">Hostel</span>}
                    </Link>
                </div>
                <div className='hover:bg-slate-800 px-2 py-2 rounded'>
                    <Link to="/Teacher/Library" className="flex items-center text-white mx-2">
                        <LocalLibrary />
                        {isOpen && <span className="ml-4">Libray</span>}
                    </Link>
                </div>
            </div>
        </div>
    );
};

const SidebarItem = ({ icon, title, isOpen }) => (
    <div className="flex items-center text-white mb-4">
        {icon}
        {isOpen && <span className="ml-4">{title}</span>}
    </div>
);

export default Sidebar;

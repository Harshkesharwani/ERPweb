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
        <div className={`flex ${isOpen ? 'w-64' : 'w-16'} bg-primary h-screen p-4 flex-col`}>
            <IconButton onClick={toggleSidebar} className="text-white mb-4 absolute top-0 right-0 z-50">
                {isOpen ? <Close /> : <Menu />}
            </IconButton>
            <div className="flex flex-col flex-grow mt-12">
                <Link to="/Admin/Admin-Dashboard" className="flex items-center text-white mb-4">
                    <Dashboard />
                    {isOpen && <span className="ml-4">Dashboard</span>}
                </Link>
                <Link to="/Admin/Admin-Attendance" className="flex items-center text-white mb-4">
                    <AssignmentTurnedIn />
                    {isOpen && <span className="ml-4">Attendance</span>}
                </Link>
                <Link to="/Admin/Admin-Teacher" className="flex items-center text-white mb-4">
                    <School />
                    {isOpen && <span className="ml-4">Teacher</span>}
                </Link>
                {/* <SidebarItem icon={<School />} title="Teacher" isOpen={isOpen} /> */}
                <Link to="/Admin/Admin-Student" className="flex items-center text-white mb-4">
                    <People />
                    {isOpen && <span className="ml-4">Student</span>}
                </Link>
                <Link to="/Admin/Admin-Enquiry" className="flex items-center text-white mb-4">
                    <ContactMail />
                    {isOpen && <span className="ml-4">Enquiry</span>}
                </Link>
                <SidebarItem icon={<MonetizationOn />} title="Fees" isOpen={isOpen} />
                <SidebarItem icon={<Replay />} title="Dues" isOpen={isOpen} />
                <SidebarItem icon={<Receipt />} title="Refund" isOpen={isOpen} />

                <Link to="/Admin/Admin-Certificate" className="flex items-center text-white mb-4">
                    <LibraryBooks />
                    {isOpen && <span className="ml-4">Certificate</span>}
                </Link>
                <Link to="/Admin/Admin-Examination" className="flex items-center text-white mb-4">
                    <Assignment />
                    {isOpen && <span className="ml-4">Examination</span>}
                </Link>
                <Link to="/Admin/Admin-Homework" className="flex items-center text-white mb-4">
                    <ListAlt />
                    {isOpen && <span className="ml-4">Homework</span>}
                </Link>
                <Link to="/Admin/Admin-Setpaper" className="flex items-center text-white mb-4">
                    <Assignment />
                    {isOpen && <span className="ml-4">Set Paper</span>}
                </Link>
                <Link to="/Admin/Admin-Result" className="flex items-center text-white mb-4">
                    <AssignmentTurnedIn />
                    {isOpen && <span className="ml-4">Result</span>}
                </Link>
                <Link to="/Admin/Admin-Timetable" className="flex items-center text-white mb-4">
                    <Event />
                    {isOpen && <span className="ml-4">Time-Table</span>}
                </Link>
                <Link to="/Admin/Admin-Event" className="flex items-center text-white mb-4">
                    <Today />
                    {isOpen && <span className="ml-4">Event</span>}
                </Link>
                <Link to="/Admin/Admin-Holiday" className="flex items-center text-white mb-4">
                    <CalendarToday />
                    {isOpen && <span className="ml-4">Holiday</span>}
                </Link>
                <Link to="/Admin/Admin-Leave" className="flex items-center text-white mb-4">
                    <Replay />
                    {isOpen && <span className="ml-4">leave</span>}
                </Link>
                <Link to="/Admin/Admin-Bus" className="flex items-center text-white mb-4">
                    <Commute />
                    {isOpen && <span className="ml-4">Bus</span>}
                </Link>
                <Link to="/Admin/Admin-Hostel" className="flex items-center text-white mb-4">
                    <Hotel />
                    {isOpen && <span className="ml-4">Hostel</span>}
                </Link>
                <Link to="/Admin/Admin-Library" className="flex items-center text-white mb-4">
                    <LocalLibrary />
                    {isOpen && <span className="ml-4">Libray</span>}
                </Link>
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

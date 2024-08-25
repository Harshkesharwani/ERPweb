import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../Components/AdminSidebar';
import Header from '../Components/Header';
import AdminDashboard from './AdminDashboard';
import AdminAttendance from './AdminPages/AdminAttendance';
import AdminTeacher from './AdminPages/AdminTeacher';
import AdminStudent from './AdminPages/AdminStudent';
import AdminEvent from './AdminPages/AdminEvent';
import AdminHoliday from './AdminPages/AdminHoliday';
import AdminLeave from './AdminPages/AdminLeave';
import AdminEnquiries from './AdminPages/AdminEnquiry';
import AdminHomework from './AdminPages/AdminHomework';
import AdminCertificate from './AdminPages/AdminCertificate';
import AdminResult from './AdminPages/AdminResult';
import AdminSetpaper from './AdminPages/AdminSetpaper';
import AdminBusPage from './AdminPages/AdminBus';
import AdminHostelPage from './AdminPages/AdminHostel';
import AdminLibraryPage from './AdminPages/AdminLibrary';
import AdminExaminationPage from './AdminPages/AdminExamination';
import Timetable from './AdminPages/AdminTime-Table';

function AdminRoute() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const user = localStorage.getItem('userProfile');
    console.log(user)
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="flex-1 flex flex-col">
                <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
                    <Header />
                    <Routes>
                        <Route path="/Admin-Dashboard" element={<AdminDashboard />} />
                        <Route path="/Admin-Attendance" element={<AdminAttendance />} />
                        <Route path="/Admin-Teacher" element={<AdminTeacher />} />
                        <Route path="/Admin-Student" element={<AdminStudent />} />
                        <Route path="/Admin-Event" element={<AdminEvent />} />
                        <Route path="/Admin-Holiday" element={<AdminHoliday />} />
                        <Route path="/Admin-Leave" element={<AdminLeave />} />
                        <Route path="/Admin-Enquiry" element={<AdminEnquiries />} />
                        <Route path="/Admin-Homework" element={<AdminHomework />} />
                        <Route path="/Admin-Certificate" element={<AdminCertificate />} />
                        <Route path="/Admin-Setpaper" element={<AdminSetpaper />} />
                        <Route path="/Admin-Result" element={<AdminResult />} />
                        <Route path="/Admin-Bus" element={<AdminBusPage />} />
                        <Route path="/Admin-Hostel" element={<AdminHostelPage />} />
                        <Route path="/Admin-Library" element={<AdminLibraryPage />} />
                        <Route path="/Admin-Examination" element={<AdminExaminationPage />} />
                        <Route path="/Admin-TimeTable" element={<Timetable />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
}

export default AdminRoute;

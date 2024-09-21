import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../Components/Header';
import Sidebar from '../Components/StudentSidebar';

import StudentDashboard from './StudentDashboard';
import StudentAttendence from './StudentPages/StudentAttendence';
import StudentTeacher from './StudentPages/StudentTeacher';
import StudentEnquiry from './StudentPages/StudentEnquiry';
import StudentCertificate from './StudentPages/StudentCertificate';
import StudentResult from './StudentPages/StudentResult';
import StudentDues from './StudentPages/StudentDues';
import StudentExamination from './StudentPages/StudentExamination';
import StudentFees from './StudentPages/StudentFees';
import StudentHomework from './StudentPages/StudentHomework';
import Events from './Common/Event';
import HolidayPage from './Common/Holiday';
import Leaves from './Common/Leaves';
import BusPage from './Common/Bus';
import HostelPage from './Common/Hostel';
import LibraryPage from './Common/Library';
import StudentTimetable from './Common/Time-table';

function StudentRoute() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <Header />
          <Routes>
            <Route path="/Student-Dashboard" element={<StudentDashboard />} />
            <Route path="/Student-Attendence" element={<StudentAttendence />} />
            <Route path="/Student-Teacher" element={<StudentTeacher />} />
            <Route path="/Student-Enquiry" element={<StudentEnquiry />} />
            <Route path='/Student-Certificate' element={<StudentCertificate />} />
            <Route path='/Student-Result' element={<StudentResult />} />
            <Route path='/Student-Dues' element={<StudentDues />} />
            <Route path='/Student-Examination' element={<StudentExamination />} />
            <Route path='/Student-Fees' element={<StudentFees />} />
            <Route path='/Student-Homework' element={<StudentHomework />} />
            <Route path='/Student-Timetable' element={<StudentTimetable />} />
            <Route path='/Student-Events' element={<Events />} />
            <Route path='/Student-Leaves' element={<Leaves />} />
            <Route path='/Student-Buses' element={<BusPage />} />
            <Route path='/Student-Hostel' element={<HostelPage />} />
            <Route path='/Student-Library' element={<LibraryPage />} />
            <Route path='/Student-Holiday' element={<HolidayPage />} />

          </Routes>
        </main>
      </div>
    </div>
  );
}

export default StudentRoute;

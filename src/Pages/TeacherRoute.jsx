import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../Components/Header';
import Sidebar from '../Components/TeacherSidebar';
import TeacherDashboard from './TeacherDashboard';
import TeacherAttendence from './TeacherPages/TeacherAttendence';
import TeacherEnquiry from './TeacherPages/TeacherEnquiry';
import TeacherCertificate from './TeacherPages/TeacherCertificate';
import TeacherExamination from './StudentPages/StudentExamination';
import TeacherHomework from './TeacherPages/TeacherHomework';
import TeacherResult from './TeacherPages/TeacherResult';
import TeacherSetPaper from './TeacherPages/TeacherSetpaper';
import TeacherStudentAttendance from './TeacherPages/TeacherStuAttendence';
import TeacherStudentPage from './TeacherPages/Teacherstudent';
import Events from './Common/Event';
import Leaves from './Common/Leaves';
import BusPage from './Common/Bus';
import HostelPage from './Common/Hostel';
import HolidayPage from './Common/Holiday';
import LibraryPage from './Common/Library';
import Timetable from './Common/Time-table';

function TeacherRoute() {
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
            <Route path="/Teacher-Dashboard" element={<TeacherDashboard />} />
            <Route path="/Teacher-Attendence" element={<TeacherAttendence />} />
            <Route path="/Teacher-Enquiry" element={<TeacherEnquiry />} />
            <Route path='/Teacher-Certificate' element={<TeacherCertificate />} />
            <Route path='/Teacher-Examination' element={<TeacherExamination />} />
            <Route path='/Teacher-Homework' element={<TeacherHomework />} />
            <Route path='/Teacher-Result' element={<TeacherResult />} />
            <Route path="/Teacher-Setpaper" element={<TeacherSetPaper />} />
            <Route path="/Teacher-StuAttendence" element={<TeacherStudentAttendance />} />
            <Route path="/Teacher-Student" element={<TeacherStudentPage />} />
            <Route path='/Events' element={<Events />} />
            <Route path='/Leaves' element={<Leaves />} />
            <Route path='/Buses' element={<BusPage />} />
            <Route path='/Hostel' element={<HostelPage />} />
            <Route path='/Holiday' element={<HolidayPage />} />
            <Route path='/Library' element={<LibraryPage />} />
            <Route path='/TimeTable' element={<Timetable />} />

            {/*<Route path='/Student-Dues' element={<StudentDues/>}/>
              <Route path='/Student-Fees' element={<StudentFees/>}/>*/}

          </Routes>
        </main>
      </div>
    </div>
  );
}

export default TeacherRoute;

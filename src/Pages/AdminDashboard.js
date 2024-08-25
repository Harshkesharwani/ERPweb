// src/components/DashboardScreen.js
import React from 'react';
// import Header from '../Components/Header';
import StatisticsCard from '../Components/AdminDashboard/StatisticsCard';
import HolidaySection from '../Components/AdminDashboard/HolidaySection';
import EventsSection from '../Components/AdminDashboard/EventsSection';
import AnnouncementsSection from '../Components/AdminDashboard/AnnouncementsSection';
import CalendarSection from '../Components/AdminDashboard/CalendarSection';
import BirthdaysSection from '../Components/AdminDashboard/BirthdaysSection';

const DashboardScreen = () => {
  return (
    <div className="p-4">
      {/* <Header /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
        {/* <StatisticsCard title="Scheduled Classes" value="234" /> */}
        <StatisticsCard title="Total Students" value="1000" />
        <StatisticsCard title="Teachers" value="48" />
        <StatisticsCard title="Non Teaching Staff" value="48" />
        <StatisticsCard title="Classrooms" value="234" />
        <StatisticsCard title="Labs" value="48" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <HolidaySection />
        <EventsSection />
        <AnnouncementsSection />
        <CalendarSection />
        <BirthdaysSection />
      </div>
    </div>
  );
};

export default DashboardScreen;

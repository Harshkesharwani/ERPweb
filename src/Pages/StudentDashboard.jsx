// src/components/StudentDashboard.js
import React from 'react';

const StudentDashboard = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold">Upcoming Exams</h3>
          <p className="text-2xl">3</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold">Assignments Due</h3>
          <p className="text-2xl">5</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold">Enrolled Courses</h3>
          <p className="text-2xl">8</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold">Attendance Percentage</h3>
          <p className="text-2xl">95%</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold">Library Books Issued</h3>
          <p className="text-2xl">2</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold">Holidays</h3>
          <ul>
            <li>Holiday 1 - Date</li>
            <li>Holiday 2 - Date</li>
            <li>Holiday 3 - Date</li>
          </ul>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold">Events</h3>
          <ul>
            <li>Event 1 - Date</li>
            <li>Event 2 - Date</li>
            <li>Event 3 - Date</li>
          </ul>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold">Announcements</h3>
          <ul>
            <li>Announcement 1</li>
            <li>Announcement 2</li>
            <li>Announcement 3</li>
          </ul>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold">Calendar</h3>
          <p>Calendar content here</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold">Birthdays</h3>
          <ul>
            <li>Student 1 - Date</li>
            <li>Student 2 - Date</li>
            <li>Student 3 - Date</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

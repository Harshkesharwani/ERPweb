import React, { useEffect } from 'react';

const TeacherDashboard = () => {
  useEffect(() => {
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
      const parsedProfile = JSON.parse(userProfile);
      console.log(parsedProfile);
      console.log(parsedProfile["enrollment_or_employee_id"]);
      // fetchClassAndSection(parsedProfile["Employee ID"]);
    }
  }, []);
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Total Students</h2>
          <p className="text-2xl">150</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Classes Today</h2>
          <p className="text-2xl">4</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Assignments Pending</h2>
          <p className="text-2xl">5</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Notifications</h2>
          <p className="text-2xl">3</p>
        </div>
      </div>

      {/* Upcoming Classes Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-2xl font-bold mb-4">Upcoming Classes</h2>
        <ul>
          <li className="mb-2">Math - 10:00 AM</li>
          <li className="mb-2">Science - 11:30 AM</li>
          <li className="mb-2">History - 1:00 PM</li>
        </ul>
      </div>

      {/* Assignments Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-2xl font-bold mb-4">Assignments</h2>
        <ul>
          <li className="mb-2">Math Assignment - Due: 2024-08-01</li>
          <li className="mb-2">Science Project - Due: 2024-08-05</li>
          <li className="mb-2">History Essay - Due: 2024-08-10</li>
        </ul>
      </div>

      {/* Notifications Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Notifications</h2>
        <ul>
          <li className="mb-2">Meeting with the principal at 3:00 PM</li>
          <li className="mb-2">Submit grades for the midterm exams</li>
          <li className="mb-2">Parent-teacher conference on 2024-08-15</li>
        </ul>
      </div>
    </div>
  );
};

export default TeacherDashboard;

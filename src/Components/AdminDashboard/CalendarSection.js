// src/components/CalendarSection.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 

const CalendarSection = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="bg-white rounded-lg p-4 shadow-md my-4">
      <p className="text-gray-700">Calendar</p>
      <div className="mt-2">
        <Calendar
          onChange={setDate}
          value={date}
          className="react-calendar"
        />
      </div>
    </div>
  );
};

export default CalendarSection;

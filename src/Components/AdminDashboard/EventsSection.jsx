// src/components/EventsSection.js
import React from 'react';

const EventsSection = () => {
    return (
        <div className="bg-white rounded-lg p-4 shadow-md my-4">
            <p className="text-gray-700">Events</p>
            <div className="flex mt-2">
                <img src="event-image-uri" alt="Event" className="w-20 h-20 rounded-md" />
                <div className="ml-4">
                    <p className="font-bold">School Farewell Party</p>
                    <p className="text-gray-500">12th Passed Out Students</p>
                    <p className="text-gray-500">Organizer: Abdul Rahman</p>
                </div>
            </div>
        </div>
    );
};

export default EventsSection;

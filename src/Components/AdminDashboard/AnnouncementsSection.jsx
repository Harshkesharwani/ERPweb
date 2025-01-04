// src/components/AnnouncementsSection.js
import React from 'react';

const AnnouncementsSection = () => {
    return (
        <div className="bg-white rounded-lg p-4 shadow-md my-4">
            <p className="text-gray-700">Announcements</p>
            <div className="mt-2">
                <p className="text-gray-500">Parents Meeting for term end Examination</p>
                <p className="text-gray-500">Today</p>
            </div>
            <div className="mt-2">
                <p className="text-gray-500">Teachers Parents Monthly Meeting</p>
                <p className="text-gray-500">3 Days Ago</p>
            </div>
        </div>
    );
};

export default AnnouncementsSection;

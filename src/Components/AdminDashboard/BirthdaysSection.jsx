// src/components/BirthdaysSection.js
import React from 'react';

const BirthdaysSection = () => {
    return (
        <div className="bg-white rounded-lg p-4 shadow-md my-4">
            <p className="text-gray-700">Birthdays</p>
            <div className="flex mt-2">
                <img src="birthday-person-avatar-uri" alt="Birthday Person" className="w-10 h-10 rounded-full" />
                <div className="ml-4">
                    <p className="font-bold">John Doe</p>
                    <p className="text-gray-500">Teacher</p>
                </div>
            </div>
        </div>
    );
};

export default BirthdaysSection;

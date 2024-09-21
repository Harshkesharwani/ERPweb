// src/components/StatisticsCard.js
import React from 'react';

const StatisticsCard = ({ title, value }) => {
    return (
        <div className="bg-white rounded-lg p-4 shadow-md w-full">
            <p className="text-gray-700">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    );
};

export default StatisticsCard;

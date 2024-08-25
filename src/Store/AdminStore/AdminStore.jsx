import { url } from "../Config";
import {
    Admin_AddExamTimetable,
    Admin_ExamTimeTable,
    Admin_Homework,
    Admin_Homeworkupdate,
    Admin_Homeworkdelete,
    Admin_Homeworkcreate,
    Admin_Holidaycreate,
    Admin_Holidayupdate,
    Admin_Holidaydelete,
    Admin_Leavesfetch,
    Admin_Leavesupdate,
    Admin_Eventscreate,
    Admin_Eventsupdate,
    Admin_Eventsdelete,
    Admin_teacherfetch,
    Admin_teacherdelete,
    Admin_teacherupdate,
    Admin_Attendence_fetch,
    Admin_Attendence_update,
    Admin_Attendence_add,
} from './AdminAPI'; 

const Postdata = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
}

const Getdata = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
}

const Admin_attendence = async (studentID, date) => {
    try {
        const response = await fetch(`${url}${Admin_Attendence_fetch}`, {
            ...Postdata,
            body: JSON.stringify({ studentID, date }) // Passing data in the request body
        });

        if (!response.ok) {
            throw new Error('Failed to fetch attendance details');
        }

        const data = await response.json();
        return data; // Return the attendance data
    } catch (error) {
        console.error('Error fetching attendance details:', error);
        throw error; // Re-throw the error for further handling
    }
};
import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { url } from '../../Store/Config';

const StudentTeacher = () => {
    const [teachers, setTeachers] = useState([]);
    const [columnDefs] = useState([
        { headerName: 'Name', field: 'Name', sortable: true, filter: true },
        { headerName: 'Phone', field: 'Contact', sortable: true, filter: true },
        { headerName: 'Email', field: 'email', sortable: true, filter: true },
        { headerName: 'Department', field: 'Subject', sortable: true, filter: true },
    ]);

    const fetchTeachers = async (clasess, section) => {
        try {
            const response = await fetch(`${url}/teachers_details`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    class: clasess,
                    section: section
                })
            });

            const data = await response.json();
            console.log(data)
            setTeachers(data.teachers);
        } catch (error) {
            console.error('Error fetching teachers:', error);
        }
    };

    const getUserProfile = async () => {
        try {
            const userProfile = localStorage.getItem('userProfile');
            if (userProfile) {
                const parsedProfile = JSON.parse(userProfile);
                fetchTeachers(parsedProfile['Class'], parsedProfile['section_or_department']);
                console.log(parsedProfile['Class'], parsedProfile['section_or_department']);
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    useEffect(() => {
        getUserProfile();
    }, []);

    return (
        <div className="ag-theme-alpine mt-10" style={{ height: 600, width: '100%' }}>
            <AgGridReact
                rowData={teachers}
                columnDefs={columnDefs}
            />
        </div>
    );
};

export default StudentTeacher;

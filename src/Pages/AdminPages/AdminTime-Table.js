import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const periods = ['1st Period', '2nd Period', '3rd Period', 'Lunch', '4th Period', '5th Period'];

// Dummy data for subjects
const subjects = {
    'Monday': ['Mathematics', 'Physics', 'Chemistry', 'Lunch', 'Biology', 'English'],
    'Tuesday': ['English', 'Chemistry', 'Physics', 'Lunch', 'Mathematics', 'Biology'],
    'Wednesday': ['Biology', 'English', 'Physics', 'Lunch', 'Mathematics', 'Chemistry'],
    'Thursday': ['Chemistry', 'Mathematics', 'English', 'Lunch', 'Physics', 'Biology'],
    'Friday': ['Physics', 'Biology', 'Mathematics', 'Lunch', 'Chemistry', 'English'],
    'Saturday': ['English', 'Mathematics', 'Biology', 'Lunch', 'Physics', 'Chemistry'],
};

const Timetable = () => {
    const [rowData, setRowData] = useState(periods.map((period, index) => {
        const row = { period };
        daysOfWeek.forEach(day => {
            row[day] = subjects[day][index];
        });
        return row;
    }));

    const columnDefs = [
        { headerName: 'Period', field: 'period', sortable: true, filter: true, resizable: true },
        { headerName: 'Monday', field: 'Monday', editable: true, sortable: true, filter: true, resizable: true },
        { headerName: 'Tuesday', field: 'Tuesday', editable: true, sortable: true, filter: true, resizable: true },
        { headerName: 'Wednesday', field: 'Wednesday', editable: true, sortable: true, filter: true, resizable: true },
        { headerName: 'Thursday', field: 'Thursday', editable: true, sortable: true, filter: true, resizable: true },
        { headerName: 'Friday', field: 'Friday', editable: true, sortable: true, filter: true, resizable: true },
        { headerName: 'Saturday', field: 'Saturday', editable: true, sortable: true, filter: true, resizable: true },
    ];

    const onCellValueChanged = (params) => {
        const updatedRowData = [...rowData];
        updatedRowData[params.node.rowIndex] = params.data;
        setRowData(updatedRowData);
    };

    return (
        <div className="ag-theme-alpine mt-10" style={{ height: 400, width: '100%' }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={{
                    flex: 1,
                    minWidth: 100,
                    resizable: true,
                }}
                onCellValueChanged={onCellValueChanged}
            />
        </div>
    );
};

export default Timetable;

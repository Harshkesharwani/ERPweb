import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'; // Import necessary MUI components
import { url } from '../../Store/Config';

const TeacherEnquiry = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [sortOrder, setSortOrder] = useState('new');
    const [replyingIndex, setReplyingIndex] = useState(null);
    const [replyMessage, setReplyMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [id, setId] = useState('');
    const [classes, setClasses] = useState([]); // State for storing class options
    const [sections, setSections] = useState([]); // State for storing section options
    const [selectedClass, setSelectedClass] = useState(''); // Selected class
    const [selectedSection, setSelectedSection] = useState(''); // Selected section

    useEffect(() => {
        fetchUserProfile();
    }, []);

    useEffect(() => {
        if (selectedClass) {
            filterSections(selectedClass); // Filter sections based on selected class
        }
    }, [selectedClass]);

    useEffect(() => {
        if (selectedClass && selectedSection) {
            fetchEnquiries(); // Fetch enquiries based on selected class and section
        }
    }, [selectedClass, selectedSection]);

    const fetchUserProfile = async () => {
        const userProfile = localStorage.getItem('userProfile');
        if (userProfile) {
            const parsedProfile = JSON.parse(userProfile);
            fetchClassAndSection(parsedProfile["enrollment_or_employee_id"]);
            setId(parsedProfile["enrollment_or_employee_id"])
        }
    };

    const fetchClassAndSection = async (id) => {
        try {
            const response = await fetch(`${url}/teacher_class_section_details`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ enrollment_or_employee_id: id }),
            });
            const data = await response.json();
            const mappedClasses = data.Sections.reduce((acc, [classNumber, section]) => {
                let existingClass = acc.find(cls => cls.classNumber === classNumber);
                if (!existingClass) {
                    existingClass = { classNumber, sections: [] };
                    acc.push(existingClass);
                }
                existingClass.sections.push({ section_id: section, section_name: section });
                return acc;
            }, []);
            setClasses(mappedClasses); // Set classes state with mapped data
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch class and section data');
            setLoading(false);
        }
    };

    const filterSections = (classId) => {
        const filteredSections = classes.find(cls => cls.classNumber === classId)?.sections || [];
        setSections(filteredSections); // Set sections based on selected class
    };

    const fetchEnquiries = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${url}/teacher_enquiry_fetch`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    enrollment_or_employee_id: "teacher",
                    class: selectedClass, // Include selected class
                    section: selectedSection // Include selected section
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const formattedEnquiries = data.map((enquiry, index) => ({
                id: index,
                title: `Enquiry ${index + 1}`,
                submitDate: enquiry.date,
                teacherName: enquiry.Name,
                subject: enquiry.Subject,
                contactNo: enquiry["Phone Number"],
                message: enquiry.Message,
                teacherId: enquiry.Teacher_id,
            }));
            setEnquiries(formattedEnquiries);
        } catch (error) {
            setError('Failed to fetch data');
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSort = (order) => {
        const sortedEnquiries = [...enquiries].sort((a, b) => {
            if (order === 'new') {
                return new Date(b.submitDate) - new Date(a.submitDate);
            } else {
                return new Date(a.submitDate) - new Date(b.submitDate);
            }
        });
        setSortOrder(order);
        setEnquiries(sortedEnquiries);
    };

    const handleReply = async (index) => {
        const enquiry = enquiries[index];
        const repliedOn = new Date().toISOString().split('T')[0];

        const postData = {
            date: enquiry.submitDate,
            teacher_id: enquiry.teacherId,
            teacher_name: enquiry.teacherName,
            subject: enquiry.subject,
            contact_number: enquiry.contactNo,
            message: enquiry.message,
            replied_message: replyMessage,
            replied_by: "Teacher",
            replied_date: repliedOn
        };

        try {
            const response = await fetch(`${url}/admin_enquiry_replied`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            alert('Reply sent successfully!');
            setReplyingIndex(null);
            setReplyMessage('');
        } catch (error) {
            console.error('Failed to send reply:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Enquiry</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* Sorting Buttons */}
            <div className="mb-4">
                <button
                    className={`px-4 py-2 mr-2 rounded ${sortOrder === 'new' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => handleSort('new')}
                >
                    Newest First
                </button>
                <button
                    className={`px-4 py-2 rounded ${sortOrder === 'old' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => handleSort('old')}
                >
                    Oldest First
                </button>
            </div>

            {/* Dropdowns for Class and Section */}
            <div className='grid grid-cols-2 gap-4'>
                <FormControl fullWidth variant="outlined" className="mb-4">
                    <InputLabel>Class</InputLabel>
                    <Select
                        value={selectedClass}
                        onChange={(e) => {
                            setSelectedClass(e.target.value);
                            setSelectedSection(''); // Reset section when class changes
                        }}
                        label="Class"
                    >
                        {classes.map((classValue) => (
                            <MenuItem key={classValue.classNumber} value={classValue.classNumber}>
                                {classValue.classNumber}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth variant="outlined" className="mb-4" disabled={!selectedClass}>
                    <InputLabel>Section</InputLabel>
                    <Select
                        value={selectedSection}
                        onChange={(e) => setSelectedSection(e.target.value)}
                        label="Section"
                    >
                        {sections.map((sectionValue) => (
                            <MenuItem key={sectionValue.section_id} value={sectionValue.section_id}>
                                {sectionValue.section_name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>


            {/* Enquiries List */}
            {enquiries.map((enquiry, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4 mt-6">
                    <p className="mb-2"><strong>Teacher Name:</strong> {enquiry.teacherName}</p>
                    <p className="mb-2"><strong>Subject:</strong> {enquiry.subject}</p>
                    <p className="mb-2"><strong>Contact No:</strong> {enquiry.contactNo}</p>
                    <p className="mb-2"><strong>Message:</strong> {enquiry.message}</p>

                    {replyingIndex === index ? (
                        <div>
                            <textarea
                                className="w-full p-2 border rounded mb-2"
                                value={replyMessage}
                                onChange={(e) => setReplyMessage(e.target.value)}
                                placeholder="Write your reply here"
                            />
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={() => handleReply(index)}
                            >
                                Send Reply
                            </button>
                            <button
                                className="ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={() => {
                                    setReplyingIndex(null);
                                    setReplyMessage('');
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            onClick={() => setReplyingIndex(index)}
                        >
                            Reply
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default TeacherEnquiry;
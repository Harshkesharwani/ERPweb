import React, { useState, useEffect } from 'react';
import { url } from "../../Store/Config";

const AdminEnquiries = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [sortOrder, setSortOrder] = useState('new');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [replyingIndex, setReplyingIndex] = useState(null);
    const [replyMessage, setReplyMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const fetchEnquiries = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${url}/admin_enquiry_fetch`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    enrollment_or_employee_id: "admin"
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const formattedEnquiries = data.data.map((enquiry, index) => ({
                id: index,  // Assign a unique id to each enquiry
                title: `Enquiry ${index + 1}`,
                submitDate: enquiry.date,
                studentName: enquiry.Name,
                class: enquiry.Class,
                section: enquiry.Section,
                contactNo: enquiry["Phone Number"],
                parentName: enquiry["Parent Name"],
                message: enquiry.Message,
                student: enquiry.Student_id,
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
            student_id: enquiry.student,
            student_name: enquiry.studentName,
            class: enquiry.class,
            section: enquiry.section,
            parent_name: enquiry.parentName,
            contact_number: enquiry.contactNo,
            message: enquiry.message,
            replied_message: replyMessage,
            replied_by: "Admin",
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
            <h2 className="text-2xl font-bold mb-4">Admin Enquiries</h2>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

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

            {enquiries.map((enquiry, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4">
                    <p className="mb-2"><strong>Student Name:</strong> {enquiry.studentName}</p>
                    <p className="mb-2"><strong>Class:</strong> {enquiry.class}</p>
                    <p className="mb-2"><strong>Section:</strong> {enquiry.section}</p>
                    <p className="mb-2"><strong>Parent Name:</strong> {enquiry.parentName}</p>
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

export default AdminEnquiries;

import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Modal, Box, Typography, IconButton } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Close as CloseIcon, MoreHorizTwoTone as MoreHorizTwoToneIcon } from '@mui/icons-material';

const initialBooks = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
];

const initialBookRequests = [
    { id: 3, studentName: 'Alice Johnson', bookTitle: '1984' },
    { id: 4, studentName: 'Bob Brown', bookTitle: 'Moby Dick' },
];

const AdminLibraryPage = () => {
    const [books, setBooks] = useState(initialBooks);
    const [bookRequests, setBookRequests] = useState(initialBookRequests);
    const [open, setOpen] = useState(false);
    const [openRequests, setOpenRequests] = useState(false);
    const [bookDetails, setBookDetails] = useState({ id: null, title: '', author: '' });
    const [editMode, setEditMode] = useState(false);

    const handleOpenDialog = (book) => {
        if (book) {
            setBookDetails(book);
            setEditMode(true);
        } else {
            setBookDetails({ id: null, title: '', author: '' });
            setEditMode(false);
        }
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setBookDetails({ id: null, title: '', author: '' });
    };

    const handleSaveBook = () => {
        if (editMode) {
            setBooks(books.map(book => book.id === bookDetails.id ? bookDetails : book));
        } else {
            setBooks([...books, { ...bookDetails, id: Date.now() }]);
        }
        handleCloseDialog();
    };

    const handleDeleteBook = (id) => {
        setBooks(books.filter(book => book.id !== id));
    };

    const handleOpenRequests = () => setOpenRequests(true);
    const handleCloseRequests = () => setOpenRequests(false);

    const handleApproveRequest = (id) => {
        setBookRequests(bookRequests.filter(req => req.id !== id));
    };

    const handleDeclineRequest = (id) => {
        setBookRequests(bookRequests.filter(req => req.id !== id));
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className='flex flex-row p-4 justify-between'>
                <h2 className="text-2xl font-bold mb-4">Library Management</h2>
                <div className='space-x-10'>
                    <Button color="primary" startIcon={<AddIcon />} onClick={() => handleOpenDialog(null)}>
                        Add Book
                    </Button>
                    <Button color="primary" startIcon={<MoreHorizTwoToneIcon />} onClick={handleOpenRequests}>
                        Book Requests
                    </Button>
                </div>
                <Modal open={openRequests} onClose={handleCloseRequests}>
                    <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg w-1/2">
                        <div className="flex justify-between items-center mb-4">
                            <Typography variant="h6">Pending Book Requests</Typography>
                            <IconButton onClick={handleCloseRequests}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                        {bookRequests.length > 0 ? (
                            <table className="min-w-full border border-gray-300 mx-auto">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b">Student Name</th>
                                        <th className="py-2 px-4 border-b">Book Title</th>
                                        <th className="py-2 px-4 border-b">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookRequests.map((request, index) => (
                                        <tr key={index}>
                                            <td className="py-2 px-4 border-b">{request.studentName}</td>
                                            <td className="py-2 px-4 border-b">{request.bookTitle}</td>
                                            <td className="py-2 px-4 border-b flex flex-row space-x-10">
                                                <Button color="primary" onClick={() => handleApproveRequest(request.id)}>Approve</Button>
                                                <Button color="secondary" onClick={() => handleDeclineRequest(request.id)}>Decline</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <Typography>No pending requests.</Typography>
                        )}
                    </Box>
                </Modal>
            </div>
            <div className="flex flex-col space-y-4 mb-6">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Book Title</th>
                            <th className="py-2 px-4 border-b">Author</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book => (
                            <tr key={book.id}>
                                <td className="py-2 px-4 border-b">{book.title}</td>
                                <td className="py-2 px-4 border-b">{book.author}</td>
                                <td className="py-2 px-4 border-b flex flex-row space-x-10">
                                    <Button color="primary" startIcon={<EditIcon />} onClick={() => handleOpenDialog(book)}>
                                        Edit
                                    </Button>
                                    <Button color="secondary" startIcon={<DeleteIcon />} onClick={() => handleDeleteBook(book.id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Dialog open={open} onClose={handleCloseDialog}>
                <div className='flex flex-row p-4 justify-between'>
                    <DialogTitle>{editMode ? 'Edit Book' : 'Add Book'}</DialogTitle>
                </div>
                <DialogContent>
                    <TextField
                        label="Book Title"
                        value={bookDetails.title}
                        onChange={(e) => setBookDetails({ ...bookDetails, title: e.target.value })}
                        className="m-4 w-full"
                    />
                    <TextField
                        label="Author"
                        value={bookDetails.author}
                        onChange={(e) => setBookDetails({ ...bookDetails, author: e.target.value })}
                        className="m-4 w-full"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveBook} color="primary">
                        {editMode ? 'Save Changes' : 'Add Book'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AdminLibraryPage;

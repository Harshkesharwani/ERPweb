import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemText, Divider, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, ToggleButton, ToggleButtonGroup, Avatar } from '@mui/material';
import { url } from '../../Store/Config';

const LibraryPage = () => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [open, setOpen] = useState(false);
    const [returnDate, setReturnDate] = useState('');
    const [view, setView] = useState('available'); // 'available' or 'borrowed'
    const [studentId, setStudentId] = useState(null);

    // Fetch available books from API
    const fetchAvailableBooks = async () => {
        try {
            const response = await fetch(`${url}/library_books_fetch`);
            const data = await response.json();
            setBooks(data.Result || []);
        } catch (error) {
            console.error('Error fetching available books:', error);
            alert('Failed to fetch available books.');
        }
    };

    // Fetch borrowed books from API
    const fetchBorrowedBooks = async (studentId) => {
        try {
            const response = await fetch(`${url}/books_issued_fetch`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ enrollment_or_employee_id: studentId }),
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            setBooks(data.result || []);
        } catch (error) {
            console.error('Error fetching borrowed books:', error);
            alert('Failed to fetch borrowed books.');
        }
    };

    // Fetch user profile from localStorage
    const getUserProfile = () => {
        try {
            const userProfile = localStorage.getItem('userProfile');
            if (userProfile) {
                const parsedProfile = JSON.parse(userProfile);
                setStudentId(parsedProfile["enrollment_or_employee_id"]);
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    useEffect(() => {
        // Fetch user profile
        getUserProfile();
    }, []);

    useEffect(() => {
        if (view === 'available') {
            fetchAvailableBooks();
        } else if (view === 'borrowed' && studentId) {
            fetchBorrowedBooks(studentId);
        }
    }, [view, studentId]);

    const handleOpen = (book) => {
        setSelectedBook(book);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedBook(null);
        setReturnDate('');
    };

    const handleBorrow = () => {
        if (returnDate.trim()) {
            // Logic to handle book borrowing
            alert(`Borrowed "${selectedBook.book_name}" with return date: ${returnDate}`);
            handleClose();
        } else {
            alert('Please select a return date.');
        }
    };

    const handleViewChange = (event, newView) => {
        if (newView) {
            setView(newView);
        }
    };

    return (
        <Box className="p-4">
            <h1 className="text-3xl font-bold mb-6">Library</h1>
            <ToggleButtonGroup
                value={view}
                exclusive
                onChange={handleViewChange}
                aria-label="book view"
                className="mb-4"
            >
                <ToggleButton value="available" aria-label="available books">
                    Available Books
                </ToggleButton>
                <ToggleButton value="borrowed" aria-label="borrowed books">
                    My Books
                </ToggleButton>
            </ToggleButtonGroup>

            <Paper elevation={3} className="p-4 mb-4">
                <Typography variant="h6" className="mb-4">
                    {view === 'available' ? 'Available Books' : 'My Borrowed Books'}
                </Typography>
                <List>
                    {books.length > 0 ? books.map((book) => (
                        <React.Fragment key={book.id}>
                            <ListItem button onClick={() => handleOpen(book)}>
                                <Avatar src={book.image} alt={book.book_name} className="mr-2" />
                                <ListItemText
                                    primary={book.book_name}
                                    secondary={`Class: ${book.class}${view === 'borrowed' ? `, Issued On: ${book.issued_on}, Return Date: ${book.return_date}, Status: ${book.status}` : `, Subject: ${book.subject}`}`}
                                />
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    )) : (
                        <ListItem>
                            <ListItemText primary={`No ${view === 'available' ? 'books available' : 'borrowed books'}.`} />
                        </ListItem>
                    )}
                </List>
            </Paper>

            {/* Book Detail Dialog */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{view === 'available' ? 'Borrow Book' : 'Book Details'}</DialogTitle>
                <DialogContent>
                    {selectedBook && (
                        <Box>
                            <Typography variant="h6" gutterBottom>Book Details</Typography>
                            <Typography><strong>Title:</strong> {selectedBook.book_name}</Typography>
                            <Typography><strong>Class:</strong> {selectedBook.class}</Typography>
                            <Typography><strong>Subject:</strong> {selectedBook.subject}</Typography>
                            <Typography><strong>Status:</strong> {selectedBook.status}</Typography>
                            {view === 'available' && (
                                <TextField
                                    margin="dense"
                                    label="Return Date"
                                    type="date"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    value={returnDate}
                                    onChange={(e) => setReturnDate(e.target.value)}
                                />
                            )}
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    {view === 'available' && (
                        <Button onClick={handleBorrow} color="primary">
                            Borrow
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default LibraryPage;

import React, { useContext, useEffect, useState, useCallback } from "react";
import noteContext from "../context/notes/noteContext";
import './Addnote.css';

const Addnote = () => {
    const { notes, getNotes, addNote, deleteNote, editNote } = useContext(noteContext);
    const [newNote, setNewNote] = useState({ title: "", description: "" });

    // Ensure fetchNotes is stable across renders
    const fetchNotes = useCallback(() => {
        getNotes(); // Fetches all existing notes for the logged-in user
    }, [getNotes]);

    useEffect(() => {
        fetchNotes(); // Fetch previously stored notes on page load
    }, [fetchNotes]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addNote(newNote.title, newNote.description);
        setNewNote({ title: "", description: "" });
        fetchNotes(); // Refresh notes list after adding a new one
    };

    const handleDelete = (id) => {
        deleteNote(id); // Call delete method
    };

    const handleEdit = (id, title, description) => {
        // Prompt user to update title and description
        const newTitle = prompt("Enter new title", title);
        const newDescription = prompt("Enter new description", description);

        if (newTitle && newDescription) {
            editNote(id, newTitle, newDescription); // Call edit method
        }
    };

    return (
        <div>
            <div className="addnote-container">
                <h2>Add a Note</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={newNote.title}
                        onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={newNote.description}
                        onChange={(e) => setNewNote({ ...newNote, description: e.target.value })}
                        required
                    />
                    <button type="submit">Add Note</button>
                    <h2>Your Notes</h2>
                </form>
            </div>

            <div className="notes-grid">
                {notes.length > 0 ? (
                    notes.map((note) => (
                        <div className="note-item" key={note._id}>
                            <h3>
                                {note.title}
                                <i
                                    className="fa-solid fa-pen-to-square mx-2"
                                    onClick={() => handleEdit(note._id, note.title, note.description)}
                                    style={{ cursor: "pointer" }}
                                ></i> {/* Edit Icon */}
                                <i
                                    className="fa-solid fa-trash mx-2"
                                    onClick={() => handleDelete(note._id)}
                                    style={{ cursor: "pointer" }}
                                ></i> {/* Delete Icon */}
                            </h3>
                            <p>{note.description}</p>
                        </div>
                    ))
                ) : (
                    <p>No notes available.</p>
                )}
            </div>
        </div>
    );
};

export default Addnote;

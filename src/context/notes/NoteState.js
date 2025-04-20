import NoteContext from "./noteContext";
import { useState, useEffect } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const [notes, setNotes] = useState([]);

    // Fetch all notes
    const getNotes = async () => {
        const response = await fetch(`${host}/api/note/mov`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
        });

        const json = await response.json();
        setNotes(json);
    };

    useEffect(() => {
        getNotes();
    }, []);

    // Add a new note
    const addNote = async (title, description, tag) => {
        try {
            const response = await fetch(`${host}/api/note/addnote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({ title, description, tag }),
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const newNote = await response.json();
            setNotes((prevNotes) => [...prevNotes, newNote]);

        } catch (error) {
            console.error("Error adding note:", error);
        }
    };

    // Delete a note
    const deleteNote = async (id) => {
        try {
            const response = await fetch(`${host}/api/note/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "auth-token": localStorage.getItem("token"),
                },
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));

        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    // Edit a note
    const editNote = async (id, title, description, tag) => {
        try {
            const response = await fetch(`${host}/api/note/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({ title, description, tag }),
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            setNotes((prevNotes) =>
                prevNotes.map((note) =>
                    note._id === id ? { ...note, title, description, tag } : note
                )
            );

        } catch (error) {
            console.error("Error updating note:", error);
        }
    };

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;

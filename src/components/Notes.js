import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import Addnote from "./Addnote";

const Notes = () => {
    const { notes, getNotes } = useContext(noteContext);

    useEffect(() => {
        console.log("📤 Fetching notes...");
        getNotes();
    }, []); 

    return (
        <>
            <Addnote />
            <div className="container">
                <h2>Your Notes</h2>
                <div className="row">
                    {Array.isArray(notes) && notes.length > 0 ? (
                        notes.map((note) => (
                            <div className="col-md-4" key={note._id}>
                                <NoteItem note={note} />
                            </div>
                        ))
                    ) : (
                        <p>No notes available</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Notes;
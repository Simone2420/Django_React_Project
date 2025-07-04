import { useState, useEffect, use } from "react";
import api from "../api";
export default function Home() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const getNote = () => {
        api
        .get("/api/notes/")
        .then((res) => res.data)
        .then((data) => {
            setNotes(data);
            console.log("Notes fetched successfully:", data);
        })
        .catch((error) => alert("An error occurred: " + error));
    };
    const deleteNote = (id) => {
        api.delete(`/api/notes/${id}/`)
        .then((res) => {
            if (res.status === 204) {
                console.log("Note deleted successfully");
            }
            else {
                alert("An error occurred while deleting the note", res.status);
            }
        }).catch((error) => {
            console.error("Error deleting note:", error);
            alert("An error occurred while deleting the note: " + error);
        });
    }
    const createNote = (e) => {
        e.preventDefault();
        api.post("/api/notes/", { title, content })
        .then((res) => {
            if (res.status === 201) {
                console.log("Note created successfully:", res.data);
                setTitle("");
                setContent("");
            } else {
                alert("An error occurred while creating the note: " + res.status);
            }
        }).catch((error) => {
            console.error("Error creating note:", error);
            alert("An error occurred while creating the note: " + error);
        });
        getNote();
    }
    useEffect(() => {
        getNote();
    }, []);
    return (
        <div>
            <h1>Notes</h1>
            <div>
                <form onSubmit={createNote}>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Title" 
                        required
                    />
                    <br />
                    <textarea 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        placeholder="Content" 
                        required
                    />
                    <br />
                    <button type="submit" value="Submit">Create Note</button>
                </form>
            </div>
        </div>
    );
}

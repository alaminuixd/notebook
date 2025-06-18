import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import axiosApi from "../lib/axios";

const CreateNote = () => {
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // handler functions
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNote((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    if (!newNote.title.trim() || !newNote.content.trim()) {
      toast.error("Title and Content are required.");
      return;
    }
    setLoading(true);
    try {
      await axiosApi.post("/notes", {
        title: newNote.title,
        content: newNote.content,
      });
      setNewNote(() => ({
        title: "",
        content: "",
      }));
      toast.success("Note created successfully.");
      navigate("/");
    } catch (error) {
      console.log(`Error craeting note ${error.response.status}`);
      if (error.response.status === 429) {
        toast.error("Slow down! You are creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-dvh">
      <div className="mt-20 w-2xl mx-auto">
        <Link
          to={"/"}
          className="border border-gray-300 py-3 px-5 rounded-full inline-flex items-center gap-1 hover:gap-4 transition-all text-gray-600 shadow-[0_1px_2px_rgba(0,0,0,0.15)]"
        >
          <span className="inline-block font-medium">Go Home</span>
          <ArrowRight size={20} />
        </Link>
        <form className="note-card" onSubmit={handleInputSubmit}>
          <h1>Create a new note.</h1>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            placeholder="Note title"
            value={newNote.title}
            onChange={handleInputChange}
          />
          <label htmlFor="content" className="mt-4 mb-2">
            Content:{" "}
          </label>
          <textarea
            name="content"
            placeholder="Note content"
            value={newNote.content}
            onChange={handleInputChange}
          ></textarea>
          <button type="submit">
            {loading ? "Loading..." : "Create Note"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;

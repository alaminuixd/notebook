import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import axiosApi from "../lib/axios";
import FormComp from "../components/FormComp";

const CreateNote = () => {
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
  });
  const [error, setError] = useState({
    title: false,
    content: false,
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
    setError((prev) => ({
      ...prev,
      [name]: value.trim() === "",
    }));
  };

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    if (!newNote.title.trim()) {
      toast.error("Please provide a title");
      setError((prev) => ({ ...prev, title: true }));
      return;
    }
    if (!newNote.content.trim()) {
      toast.error("Please provide the content");
      setError((prev) => ({ ...prev, content: true }));
      return;
    }
    setError((prev) => ({ ...prev, title: false, content: false }));
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
      <div className="mt-20 max-w-2xl w-full px-4 mx-auto">
        <Link
          to={"/"}
          className="border border-gray-300 py-3 px-5 rounded-full inline-flex items-center gap-1 hover:gap-4 transition-all text-gray-600 shadow-[0_1px_2px_rgba(0,0,0,0.15)]"
        >
          <span className="inline-block font-medium">Go Home</span>
          <ArrowRight size={20} />
        </Link>
        <FormComp
          header={"Create a New Note"}
          value={newNote}
          onChange={handleInputChange}
          onSubmit={handleInputSubmit}
          buttonText={loading ? "Loading..." : "Create Note"}
          error={error}
        />
      </div>
    </div>
  );
};

export default CreateNote;

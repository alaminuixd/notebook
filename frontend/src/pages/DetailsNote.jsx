import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axiosApi from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, Loader, Trash2Icon } from "lucide-react";
import Confirm from "../components/Confirm";
import FormComp from "../components/FormComp";

const DetailsNote = () => {
  const [note, setNote] = useState(null);
  const [updateNote, setUpdateNote] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axiosApi.get(`/notes/${id}`);
        console.log(res);
        setNote(res.data);
        setUpdateNote({ title: res.data.title, content: res.data.content });
      } catch (error) {
        console.log("Error fetching data", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [id]);
  // handler functions
  const handleDelete = async () => {
    try {
      await axiosApi.delete(`/notes/${note._id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    } finally {
      setShowConfirm(false);
    }
  };
  // handle input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateNote((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateNoteSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axiosApi.put(`/notes/${note._id}`, updateNote);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error updating note", error);
      toast.error("Failed to update the note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader className="animate-spin size-10" />
      </div>
    );
  }
  return (
    <>
      <div className="min-h-screen bg-base-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/"
              className="btn btn-ghost flex gap-2 hover:gap-4 transition-all"
            >
              <ArrowLeftIcon className="h5 w-5" />
              Back Home
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowConfirm(true);
              }}
              className="btn flex gap-2 bg-red-600 text-white rounded-full px-5 py-3 font-medium hover:bg-red-700 transition-all"
            >
              <Trash2Icon className="w-5 h-5" />
              Delete Note
            </button>
          </div>
        </div>
        {note && (
          <div>
            <div className="text-center">
              <h2 className="text-3xl pb-3">{note.title}</h2>
              <p>{note.content}</p>
            </div>
            <FormComp
              header={"Update the Note"}
              className="w-2xl mx-auto"
              value={updateNote}
              onChange={handleInputChange}
              onSubmit={updateNoteSubmit}
              buttonText={saving ? "Saving..." : "Update Note"}
            />
          </div>
        )}
      </div>
      {showConfirm && (
        <Confirm
          warnTitle="Delete Note?"
          warnContent="Are you sure you want to delete this entire note?"
          onDelete={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
};

export default DetailsNote;

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axiosApi from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeft, Loader, Trash2Icon } from "lucide-react";
import Confirm from "../components/Confirm";
import FormComp from "./../components/FormComp";

const NoteDetails = () => {
  const api = axiosApi;
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState({
    title: false,
    content: false,
  });

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const resp = await api.get(`/notes/${id}`);
        console.log(resp.data);
        setNote(resp.data);
      } catch (error) {
        console.log(`Error fetching note ${error}`);
        toast.error("Note doesn't exist");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
    console.log(note);
  }, [id]);

  const handleNoteDelete = async () => {
    try {
      await api.delete(`/notes/${note._id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete the note", error);
    } finally {
      setConfirm(false);
    }
  };
  const handleInputChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setNote((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError((prev) => ({
      ...prev,
      [name]: value.trim() === "", // true if empty
    }));
  };
  const handleInputSubmitSave = async (e) => {
    e.preventDefault();
    if (!note.title.trim()) {
      toast.error("Please add the title");
      setError((prev) => ({ ...prev, title: true }));
      return;
    }
    if (!note.content.trim()) {
      toast.error("Please add the content");
      setError((prev) => ({ ...prev, content: true }));
      return;
    }
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Note update failed", error);
      toast.error("Error updating note");
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
      <div className="max-w-7xl mx-auto mt-5 mb-5 px-4">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="fbtn btn-ghost flex gap-2 hover:gap-4 transition-all"
          >
            <ArrowLeft />
            Back to Notes
          </Link>
          <button
            onClick={() => setConfirm(true)}
            className="btn flex gap-2 bg-red-600 text-white rounded-full px-5 py-3 font-medium hover:bg-red-700 transition-all"
          >
            <Trash2Icon className="w-5 h-5" />
            Delete Note
          </button>
        </div>
        <div>
          {note && (
            <div className="text-center mt-20 md:mt-30">
              <h1 className="text-3xl mb-3">{note.title}</h1>
              <p>{note.content}</p>
            </div>
          )}
        </div>
        <div className="max-w-6xl mx-auto mt-20">
          <FormComp
            header="Update Note"
            value={note}
            onChange={handleInputChange}
            onSubmit={handleInputSubmitSave}
            buttonText={saving ? "Saving..." : "Update Note"}
            className={`mx-w-3xl mx-auto`}
            error={error}
          />
        </div>
      </div>
      {confirm && (
        <Confirm
          warnTitle="Are you sure"
          warnContent="Are you sure you want to delete this note?"
          onCancel={() => setConfirm(false)}
          onDelete={handleNoteDelete}
        />
      )}
    </>
  );
};

export default NoteDetails;

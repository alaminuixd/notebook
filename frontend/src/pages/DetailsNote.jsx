import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axiosApi from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, Loader, Trash2Icon } from "lucide-react";

const DetailsNote = () => {
  const [notes, setNotes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axiosApi.get(`/notes/${id}`);
        console.log(res);
        setNotes(res.data);
      } catch (error) {
        console.log("Error fetching data", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };
  }, [id]);
  // handler functions
  const handleDelete = () => {};

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader className="animate-spin size-10" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="btn btn-ghost">
            <ArrowLeftIcon className="h5 w-5" />
          </Link>
          <button onClick={handleDelete}>
            <Trash2Icon className="w-5 h-5" />
            Delete Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsNote;

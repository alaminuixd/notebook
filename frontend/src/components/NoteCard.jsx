import React, { useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import axiosApi from "../lib/axios";
import { SquarePen, Trash2 } from "lucide-react";
import { formateDate } from "../lib/utils";
import Confirm from "./Confirm";

const NoteCard = ({ note, setNotes }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const confirmDelete = async () => {
    try {
      await axiosApi.delete(`/notes/${note._id}`);
      setNotes((prev) => prev.filter((n) => n._id !== note._id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <>
      <Link
        to={`/note/${note._id}`}
        key={note._id}
        className="border transition-all border-gray-200 shadow-[0_0_2px_rgba(0,0,0,0.15)] rounded-[0.6rem] p-6 pb-5 hover:bg-[#f7f7f7]"
      >
        <h3 className="text-2xl font-bold text-gray-500 mb-2">{note.title}</h3>
        <p className="text-gray-600">{note.content}</p>
        <div className="flex mt-5 justify-between items-center">
          <div className="text-sm text-green-8">
            {formateDate(note.updatedAt)}
          </div>
          <div className="flex gap-4 text-gray-500">
            <SquarePen size={20} className="hover:text-yellow-500" />
            <Trash2
              size={20}
              className="hover:text-red-700"
              onClick={(e) => {
                e.preventDefault();
                setShowConfirm(true);
              }}
            />
          </div>
        </div>
      </Link>

      {showConfirm && (
        <Confirm
          warnTitle="Delete Note?"
          warnContent="Are you sure you want to delete this note?"
          onCancel={() => setShowConfirm(false)}
          onDelete={confirmDelete}
        />
      )}
    </>
  );
};

export default NoteCard;

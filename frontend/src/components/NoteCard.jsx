import { SquarePen, Trash2 } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { formateDate } from "../lib/utils";

const NoteCard = ({ note }) => {
  return (
    <Link
      to={`/note/${note._id}`}
      key={note._id}
      className="border transition-all border-gray-200 shadow-[0_0_2px_rgba(0,0,0,0.15)] rounded-[0.6rem] p-6 hover:bg-[#f7f7f7]"
    >
      <h3 className="text-2xl font-bold text-gray-500 mb-2">{note.title}</h3>
      <p className="text-gray-600">{note.content}</p>
      <div className="flex mt-2 justify-between items-center">
        <div className="text-sm text-green-8">
          {formateDate(note.updatedAt)}
        </div>
        <div className="flex gap-4 text-gray-500">
          <SquarePen size={20} className="hover:text-yellow-500" />
          <Trash2 size={20} className="hover:text-red-700" />
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;

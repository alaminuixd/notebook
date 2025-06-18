import { Notebook, Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const NoteNotFound = () => {
  return (
    <div className="flex justify-center items-center gap-8 flex-col">
      <div className="bg-gray-100 p-10 rounded-full">
        <Notebook size={50} strokeWidth={2} className="text-green-8" />
      </div>
      <h1 className="text-4xl font-medium text-gray-600">No notes available</h1>
      <p className="max-w-100 text-center text-gray-600">
        Ready to organize your thoughts? Create your first note to get satared a
        journey.
      </p>
      <Link to={"/create"} className="btn btn-add rounded-full py-4 px-8">
        Create Your first Note <Plus size={20} strokeWidth={3} />
      </Link>
    </div>
  );
};

export default NoteNotFound;

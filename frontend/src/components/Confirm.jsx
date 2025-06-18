import React from "react";

const Confirm = ({ warnTitle, warnContent, onCancel, onDelete }) => {
  return (
    <div className="w-full h-dvh bg-black/80 backdrop-blur-[2px] absolute top-0 left-0 flex justify-center items-center z-50">
      <div className="bg-gray-100 rounded-2xl py-5 px-10 shadow-2xl">
        <p className="text-lg font-semibold text-gray-700">{warnTitle}</p>
        <p className="mt-3 text-gray-700">{warnContent}</p>
        <div className="flex justify-end gap-5 mt-5">
          <span
            onClick={onCancel}
            className="inline-block cursor-pointer rounded-full px-5 py-[7px] border border-gray-300 hover:bg-gray-200 transition-all"
          >
            Cancel
          </span>
          <span
            onClick={onDelete}
            className="inline-block cursor-pointer bg-red-700 rounded-full px-5 py-[7px] text-white hover:bg-red-800"
          >
            Delete
          </span>
        </div>
      </div>
    </div>
  );
};

export default Confirm;

/* 
Are you sure?

This will delete this note and it's record in the Database.
*/

import React from "react";

const FormComp = ({
  header,
  value,
  onChange,
  onSubmit,
  buttonText = "Submit",
  className = "",
  error = null,
}) => {
  return (
    <form className={`note-card ${className} space-y-4`} onSubmit={onSubmit}>
      <h1 className="font-medium text-xl">{header}</h1>

      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="font-medium">
          Title:
        </label>
        <input
          className={`w-full border rounded p-2 ${
            error?.title ? "border-red-500" : "border-gray-300"
          }`}
          type="text"
          name="title"
          placeholder="Note title"
          value={value.title}
          onChange={onChange}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="content" className="font-medium">
          Content:
        </label>
        <textarea
          className={`w-full border rounded p-2 ${
            error?.content ? "border-red-500" : "border-gray-300"
          }`}
          name="content"
          placeholder="Note content"
          value={value.content}
          onChange={onChange}
        ></textarea>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default FormComp;

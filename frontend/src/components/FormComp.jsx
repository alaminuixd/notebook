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
    <form className={`note-card ${className}`} onSubmit={onSubmit}>
      <h1 className="font-medium">{header}</h1>
      <div className="flex justify-center items-center gap-3">
        <label htmlFor="title">Title: </label>
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
      <label htmlFor="content" className="mt-4 mb-2">
        Content:{" "}
      </label>
      <textarea
        className={`w-full border rounded p-2 mt-2 ${
          error?.content ? "border-red-500 border-doub" : "border-gray-300"
        }`}
        name="content"
        placeholder="Note content"
        value={value.content}
        onChange={onChange}
      ></textarea>
      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default FormComp;

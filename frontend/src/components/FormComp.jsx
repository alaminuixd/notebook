import React from "react";

const FormComp = ({
  header,
  value,
  onChange,
  onSubmit,
  buttonText = "Submit",
  className = "",
}) => {
  return (
    <form className={`note-card ${className}`} onSubmit={onSubmit}>
      <h1 className="font-medium">{header}</h1>
      <div className="flex justify-center items-center gap-3">
        <label htmlFor="title">Title: </label>
        <input
          className="w-full"
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

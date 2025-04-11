"use client";

// import "react-quill/dist/quill.snow.css";

import React, { useCallback, useRef } from "react";
import ReactQuill from "react-quill";

interface ReactQuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const ReactQuillEditor: React.FC<ReactQuillEditorProps> = ({ value, onChange, placeholder, className }) => {
  const quillRef = useRef(null);

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
      // ["blockquote", "code-block"],
      // [{ header: 1 }, { header: 2 }],
      // [{ script: "sub" }, { script: "super" }],
      // [{ indent: "-1" }, { indent: "+1" }],
      // [{ direction: "rtl" }],
      //   [{ header: [1, 2, 3, 4, 5, 6, false] }],
      //   ["link", "image", "video"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
  ];

  const handleChange = useCallback(
    (content: string) => {
      onChange(content);
    },
    [onChange],
  );

  return (
    <ReactQuill
      ref={quillRef}
      value={value || ""}
      onChange={handleChange}
      modules={modules}
      formats={formats}
      placeholder={placeholder}
      className={`${className} mt-2`}
    />
  );
};

export default ReactQuillEditor;

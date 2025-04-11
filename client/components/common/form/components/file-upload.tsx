import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { img, thumb, thumbInner, thumbsContainer } from "../../../custom-styles/file-input";

const FileUpload = ({
  clearErrors,
  name,
  onChange,
  accept,
  errors,
  type = "file",
  className,
  inputBoxClassName,
  initialFiles = [],
}: {
  clearErrors: (name: string) => void;
  name: string;
  onChange: (files: File[]) => void;
  accept: Record<string, string[]>;
  errors: any;
  type?: string;
  className?: string;
  inputBoxClassName?: string;
  initialFiles?: any[];
}) => {
  const [files, setFiles] = useState<any>([]);

  useEffect(() => {
    if (initialFiles && initialFiles.length) {
      const mapped = initialFiles.map((f) => {
        if (typeof f === "string") {
          return {
            preview: f,
            name: f.substring(f.lastIndexOf("/") + 1),
            isServer: true,
          };
        }
        if (f.preview) {
          return f;
        }
        return Object.assign(f, {
          preview: URL.createObjectURL(f),
          isServer: false,
        });
      });
      setFiles(mapped);
    }
  }, [initialFiles]);

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: file.type.includes("image")
            ? URL.createObjectURL(file)
            : file.type.includes("video")
              ? URL.createObjectURL(file)
              : null,
          isServer: false,
        })
      )
    );
    clearErrors(name);
    onChange([...files, ...acceptedFiles]);
  };

  const removeFile = (fileToRemove: File) => {
    const updatedFiles = files.filter((file) => file !== fileToRemove);
    setFiles(updatedFiles);
    onChange(updatedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple: true,
  });

  const isImageFile = (file: any) => {
    if (file.type) {
      return file.type.includes("image");
    }
    return /\.(jpg|jpeg|png|gif)$/i.test(file.preview);
  };

  const thumbs = files
    .filter((file) => file.preview)
    .map((file) => {
      if (isImageFile(file)) {
        return (
          <div style={thumb} key={file.name}>
            <div style={thumbInner}>
              <img
                src={file.preview}
                style={img}
                alt={file.name}
                onLoad={() => {
                  if (!file.isServer) {
                    URL.revokeObjectURL(file.preview);
                  }
                }}
              />
            </div>
          </div>
        );
      } else if (file.type && file.type.includes("video")) {
        return (
          <div style={thumb} key={file.name}>
            <div style={thumbInner}>
              <video controls style={video} src={file.preview} />
            </div>
          </div>
        );
      }
      return null;
    });

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.preview && !file.isServer) URL.revokeObjectURL(file.preview);
      });
    };
  }, [files]);

  return (
    <>
      <section className="container">
        <div {...getRootProps()} className="border-2 border-dashed py-8 px-3 cursor-pointer">
          <input {...getInputProps()} />
          <p className="text-center">Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside style={thumbsContainer}>{thumbs}</aside>
      </section>

      {errors[name] && <p className="text-red-500 text-sm">{(errors as any)[name]?.message}</p>}

      {type === "file" && files.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium text-gray-800">Uploaded Files:</h4>
          <ul>
            {files.map((file) => (
              <li key={file.name} className="flex items-center justify-between text-sm text-gray-600">
                <span>
                  {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                </span>
                <button type="button" onClick={() => removeFile(file)} className="text-red-500 hover:underline">
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default FileUpload;

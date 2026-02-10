import { useEffect, useState } from "react";
import API from "../api/api";

const FileUpload = ({ projectId }) => {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const res = await API.get(`/files/${projectId}`);
      setFiles(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [projectId]);

  const uploadFile = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("project", projectId);

    try {
      await API.post("/files", formData);
      setFile(null);
      fetchFiles();
    } catch {
      alert("Upload failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow border mt-8">
      <h3 className="text-lg font-semibold mb-4">
        📎 Project Files
      </h3>

      {/* Upload */}
      <div className="flex gap-3 mb-6">
        <input
          type="file"
          onChange={e => setFile(e.target.files[0])}
          className="border p-2 rounded w-full"
        />

        <button
          onClick={uploadFile}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </div>

      {/* File List */}
      <div className="space-y-2">
        {files.map(f => (
          <a
            key={f._id}
            href={`http://localhost:5000/uploads/${f.filename}`}
            target="_blank"
            rel="noreferrer"
            className="block bg-gray-100 p-3 rounded hover:bg-gray-200"
          >
            📄 {f.originalName}
          </a>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;

import { useState } from "react";
import API from "../api/api";

const CreateProject = ({ refreshProjects }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await API.post("/projects/create", {
        title,
        description
      });

      setTitle("");
      setDescription("");
      refreshProjects();

    } catch (error) {
      alert("Project creation failed");
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="bg-white p-6 rounded shadow-md mb-6"
    >
      <h3 className="text-lg font-semibold mb-3">
        Create New Project
      </h3>

      <input
        type="text"
        placeholder="Project title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded mb-3"
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded mb-3"
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Create Project
      </button>
    </form>
  );
};

export default CreateProject;

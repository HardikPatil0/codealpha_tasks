import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import API from "../api/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import socket from "../socket";
import ChatPanel from "../components/ChatPanel";
import FileUpload from "../components/FileUpload";


const ProjectDetail = () => {
  const { id } = useParams();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [onlineUsers, setOnlineUsers] = useState(0);

  // ⭐ NEW — Invite member state
  const [email, setEmail] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await API.get(`/tasks/${id}`);
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Realtime integration
  useEffect(() => {
    socket.emit("joinProject", id);

    socket.on("taskCreated", fetchTasks);
    socket.on("taskUpdated", fetchTasks);
    socket.on("commentAdded", fetchTasks);
    socket.on("onlineUsers", setOnlineUsers);

    return () => {
      socket.off("taskCreated");
      socket.off("taskUpdated");
      socket.off("commentAdded");
      socket.off("onlineUsers");
    };
  }, [id]);

  const createTask = async (e) => {
    e.preventDefault();

    try {
      await API.post("/tasks/create", {
        title,
        description,
        project: id
      });

      setTitle("");
      setDescription("");
      fetchTasks();
    } catch {
      alert("Task creation failed");
    }
  };

  const updateStatus = async (taskId, status) => {
    await API.put(`/tasks/${taskId}`, { status });
    fetchTasks();
  };

  // ⭐ NEW — Invite member function
  const inviteUser = async () => {
    try {
      await API.post(`/projects/invite/${id}`, { email });
      alert("User invited successfully");
      setEmail("");
    } catch {
      alert("Invite failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold">
              Project Task Board
            </h2>

            <p className="text-gray-600">
              Create tasks, drag them between columns,
              update progress and collaborate with comments.
            </p>

            <p className="text-sm text-green-600 mt-2">
              🟢 {onlineUsers} user(s) online
            </p>
          </div>

          {/* ⭐ NEW INVITE UI */}
          <div className="bg-white p-5 rounded-xl shadow mb-8 border">
            <h3 className="font-semibold mb-3">
              Invite Team Member
            </h3>

            <input
              className="input mb-3"
              placeholder="Enter user email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={inviteUser}
              className="btn btn-primary"
            >
              Invite Member
            </button>
          </div>

          {/* Task Creation */}
          <form
            onSubmit={createTask}
            className="bg-white p-6 rounded-xl shadow-lg mb-8 border"
          >
            <h3 className="text-lg font-semibold mb-4">
              Create New Task
            </h3>

            <input
              className="input mb-3"
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <textarea
              className="input mb-3"
              placeholder="Task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button className="btn btn-primary">
              Add Task
            </button>
          </form>

          {/* Task Board */}
          <DragDropContext
            onDragEnd={(result) => {
              if (!result.destination) return;

              const map = {
                todo: "todo",
                progress: "inprogress",
                done: "done"
              };

              updateStatus(
                result.draggableId,
                map[result.destination.droppableId]
              );
            }}
          >
            <div className="grid md:grid-cols-3 gap-6">

              <Column
                id="todo"
                title="Todo"
                tasks={tasks.filter(t => t.status === "todo")}
                updateStatus={updateStatus}
                refresh={fetchTasks}
              />

              <Column
                id="progress"
                title="In Progress"
                tasks={tasks.filter(t => t.status === "inprogress")}
                updateStatus={updateStatus}
                refresh={fetchTasks}
              />

              <Column
                id="done"
                title="Done"
                tasks={tasks.filter(t => t.status === "done")}
                updateStatus={updateStatus}
                refresh={fetchTasks}
              />

            </div>
          </DragDropContext>

<FileUpload projectId={id} />


<div className="mt-8">
  <ChatPanel projectId={id} />
</div>

        </div>
      </div>
    </div>
  );
};

const Column = ({ id, title, tasks, updateStatus, refresh }) => (
  <Droppable droppableId={id}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        className="bg-white rounded-xl shadow-lg p-5 border"
      >
        <h2 className="font-bold text-lg mb-4">{title}</h2>

        {tasks.map((task, index) => (
          <Draggable
            key={task._id}
            draggableId={task._id}
            index={index}
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="bg-white p-4 rounded-lg mb-4 shadow border hover:shadow-md transition"
              >
                <h4 className="font-semibold">{task.title}</h4>
                <p className="text-sm text-gray-600 mb-3">
                  {task.description}
                </p>

                <div className="flex gap-2 mb-3">
                  <button
                    onClick={() => updateStatus(task._id, "todo")}
                    className="btn btn-gray text-xs"
                  >
                    Todo
                  </button>

                  <button
                    onClick={() => updateStatus(task._id, "inprogress")}
                    className="btn btn-warning text-xs"
                  >
                    Progress
                  </button>

                  <button
                    onClick={() => updateStatus(task._id, "done")}
                    className="btn btn-success text-xs"
                  >
                    Done
                  </button>
                </div>

                <CommentSection task={task} refresh={refresh} />
              </div>
            )}
          </Draggable>
        ))}

        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

const CommentSection = ({ task, refresh }) => {
  const [text, setText] = useState("");

  const submitComment = async () => {
    if (!text.trim()) return;

    await API.post(`/tasks/comment/${task._id}`, { text });
    setText("");
    refresh();
  };

  return (
    <div className="mt-3">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add comment..."
        className="input mb-2"
      />

      <button
        onClick={submitComment}
        className="btn btn-primary text-xs"
      >
        Comment
      </button>

      <div className="mt-2 space-y-1">
        {task.comments?.map((c, i) => (
          <p key={i} className="text-xs text-gray-600">
            • {c.text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetail;

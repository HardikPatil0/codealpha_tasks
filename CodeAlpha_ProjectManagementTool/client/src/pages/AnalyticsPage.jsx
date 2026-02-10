import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const AnalyticsPage = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await API.get(`/tasks/${id}`);
      setTasks(res.data);
    };

    fetchTasks();
  }, [id]);

  const todo = tasks.filter(t => t.status === "todo").length;
  const progress = tasks.filter(t => t.status === "inprogress").length;
  const done = tasks.filter(t => t.status === "done").length;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6">
            Project Analytics
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <StatCard title="Todo Tasks" value={todo} />
            <StatCard title="In Progress" value={progress} />
            <StatCard title="Completed" value={done} />

          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-xl shadow text-center">
    <h3 className="text-lg font-semibold mb-2">
      {title}
    </h3>
    <p className="text-3xl font-bold text-blue-600">
      {value}
    </p>
  </div>
);

export default AnalyticsPage;

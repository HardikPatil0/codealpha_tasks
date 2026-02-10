import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import CreateProject from "../components/CreateProject";
import API from "../api/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">
          <CreateProject refreshProjects={fetchProjects} />

          <h2 className="text-xl font-bold mb-4">
            Your Projects
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {projects.map((p) => (
              <div
                key={p._id}
                onClick={() => navigate(`/project/${p._id}`)}
                className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-lg transition border"
              >
                <h3 className="font-semibold text-lg">
                  {p.title}
                </h3>

                <p className="text-gray-600">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

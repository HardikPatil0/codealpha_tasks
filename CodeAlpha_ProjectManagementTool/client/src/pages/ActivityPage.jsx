import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const ActivityPage = () => {
  const { id } = useParams();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivity = async () => {
      const res = await API.get(`/activity/${id}`);
      setActivities(res.data);
    };

    fetchActivity();
  }, [id]);

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />
      <div className="flex-1">
        <Navbar />

        <div className="p-8">

          <h2 className="text-2xl font-bold mb-6">
            Activity Timeline
          </h2>

          {activities.map(a => (
            <div
              key={a._id}
              className="bg-white p-4 rounded-lg shadow mb-3"
            >
              <b>{a.user?.name}</b> {a.action}
              <p className="text-xs text-gray-500">
                {new Date(a.createdAt).toLocaleString()}
              </p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default ActivityPage;

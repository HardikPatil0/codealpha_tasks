import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const NotificationsPage = () => {
  const { id } = useParams();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await API.get(`/notifications/${id}`);
      setNotifications(res.data);
    };

    fetchNotifications();
  }, [id]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6">
            Notifications
          </h2>

          {notifications.map(n => (
            <div
              key={n._id}
              className="bg-white p-4 rounded-lg shadow mb-3"
            >
              <b>{n.user?.name}</b> {n.text}
              <p className="text-xs text-gray-500">
                {new Date(n.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;

import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/api";

const Sidebar = () => {
  const { id } = useParams();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        if (!id) return;

        const res = await API.get(`/projects/members/${id}`);
        setMembers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMembers();
  }, [id]);

  const linkStyle =
    "block p-3 rounded-lg font-medium transition";

  const activeStyle =
    "bg-blue-600 text-white";

  const inactiveStyle =
    "hover:bg-gray-100 text-gray-700";

  return (
    <div className="w-64 bg-white shadow-lg h-screen p-6 flex flex-col">

      {/* Logo */}
      <h2 className="text-2xl font-bold text-blue-600 mb-8">
        ProjectFlow
      </h2>

      {/* MAIN NAVIGATION */}
      <nav className="space-y-2 mb-6">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${linkStyle} ${
              isActive ? activeStyle : inactiveStyle
            }`
          }
        >
          📊 Dashboard
        </NavLink>

        {id && (
          <>
            <NavLink
              to={`/project/${id}`}
              className={({ isActive }) =>
                `${linkStyle} ${
                  isActive ? activeStyle : inactiveStyle
                }`
              }
            >
              📁 Project Board
            </NavLink>

            <NavLink
              to={`/chat/${id}`}
              className={({ isActive }) =>
                `${linkStyle} ${
                  isActive ? activeStyle : inactiveStyle
                }`
              }
            >
              💬 Team Chat
            </NavLink>

            <NavLink
              to={`/notifications/${id}`}
              className={({ isActive }) =>
                `${linkStyle} ${
                  isActive ? activeStyle : inactiveStyle
                }`
              }
            >
              🔔 Notifications
            </NavLink>

            <NavLink
              to={`/activity/${id}`}
              className={({ isActive }) =>
                `${linkStyle} ${
                  isActive ? activeStyle : inactiveStyle
                }`
              }
            >
              📜 Activity Timeline
            </NavLink>

            <NavLink
              to={`/analytics/${id}`}
              className={({ isActive }) =>
                `${linkStyle} ${
                  isActive ? activeStyle : inactiveStyle
                }`
              }
            >
              📊 Analytics
            </NavLink>
          </>
        )}

        <p className="text-gray-400 text-sm mt-4">
          Manage projects, tasks, collaboration & workflow.
        </p>
      </nav>

      {/* TEAM MEMBERS */}
      {id && (
        <div className="mt-auto">
          <h3 className="font-semibold text-gray-700 mb-3">
            Team Members
          </h3>

          {members.length === 0 && (
            <p className="text-xs text-gray-400">
              No members yet
            </p>
          )}

          <div className="space-y-2 max-h-40 overflow-y-auto">
            {members.map(member => (
              <div
                key={member._id}
                className="bg-gray-100 p-2 rounded-lg"
              >
                <p className="text-sm font-medium">
                  {member.name}
                </p>
                <p className="text-xs text-gray-500">
                  {member.email}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default Sidebar;

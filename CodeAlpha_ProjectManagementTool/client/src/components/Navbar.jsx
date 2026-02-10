import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="bg-white shadow flex justify-between px-8 py-4">
      <h1 className="text-xl font-bold text-gray-800">
        Project Management Tool
      </h1>

      <button onClick={logoutHandler} className="btn btn-primary">
        Logout
      </button>
    </div>
  );
};

export default Navbar;

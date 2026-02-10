import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ProjectDetail from "./pages/ProjectDetail";
import ActivityPage from "./pages/ActivityPage";
import ChatPage from "./pages/ChatPage";
import NotificationsPage from "./pages/NotificationsPage";
import AnalyticsPage from "./pages/AnalyticsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
  path="/activity/:id"
  element={
    <ProtectedRoute>
      <ActivityPage />
    </ProtectedRoute>
  }
/>

<Route path="/chat/:id" element={<ChatPage />} />
<Route path="/notifications/:id" element={<NotificationsPage />} />
<Route path="/analytics/:id" element={<AnalyticsPage />} />

        {/* ADD THIS ROUTE */}
        <Route
          path="/project/:id"
          element={
            <ProtectedRoute>
              <ProjectDetail />
            </ProtectedRoute>
          }
        />


      </Routes>
    </BrowserRouter>
  );
}

export default App;

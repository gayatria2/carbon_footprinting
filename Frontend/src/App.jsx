import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import Activity from "./pages/Activity";
import Analytics from "./pages/Analytics";
import Goals from "./pages/Goals";
import Recommendation from "./pages/Recommendation";
import Leaderboard from "./pages/Leaderboard";



import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
        <Route
        path="/"
        element={<Home />}
      />

      {/* AUTH */}
      <Route
        path="/login"
        element={<Login />}
      />
      

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />


      <Route path="/profile" element={<Profile />} />
      

      <Route path="/activity" element={<Activity />} />

      <Route path="/analytics" element={<Analytics />} />

      <Route path="/goal" element={<Goals />} />
       <Route path="/recommendation" element={<Recommendation />}/>
      

      <Route path="/leaderboard" element={<Leaderboard />} />

      <Route path="/settings" element={<Settings />}/>



    </Routes>
  );
}

export default App;
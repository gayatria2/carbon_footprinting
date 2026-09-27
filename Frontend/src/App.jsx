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
import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminUsers from "./admin/pages/AdminUsers";
import AdminActivities from "./admin/pages/AdminActivities";
import AdminAnalytics from "./admin/pages/AdminAnalytics";
// import AdminProtectedRoute from "./admin/components/AdminProtectedRoute";

import AdminGoals from "./admin/pages/AdminGoals";
import AdminLeaderboard from "./admin/pages/AdminLeaderboard";
import AdminEmissionFactors from "./admin/pages/AdminEmissionFactors";
import AdminReports from "./admin/pages/AdminReports";


function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />}/>

      {/* AUTH */}
      <Route path="/login" element={<Login />}/>
      

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />


      <Route path="/profile" element={<Profile />} />
      

      <Route path="/activity" element={<Activity />} />

      <Route path="/analytics" element={<Analytics />} />

      <Route path="/goal" element={<Goals />} />
       <Route path="/recommendation" element={<Recommendation />}/>
      

      <Route path="/leaderboard" element={<Leaderboard />} />

      <Route path="/settings" element={<Settings />}/>
      <Route path="/admin/login" element={<AdminLogin />}/>
      <Route path="/admin/dashboard"element={<AdminDashboard />}/>
      <Route path="/admin/users"element={<AdminUsers />}/>
       <Route path="/admin/activities" element={<AdminActivities />}/>


       <Route path="/admin/analytics" element={ <AdminAnalytics />  }/>
       <Route path="/admin/goals" element={ <AdminGoals /> }/>
      
      <Route path="/admin/leaderboard" element={  <AdminLeaderboard />}/>

      <Route path="/admin/emission-factors" element={<AdminEmissionFactors />}/>

      <Route path="/admin/reports" element={  <AdminReports />}/>

</Routes>
  );
}

export default App;








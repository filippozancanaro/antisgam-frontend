import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Homepage from "@/pages/Homepage/Homepage";
import LoadingScreen from "@/pages/LoadingScreen/LoadingScreen";
import NotFound from "@/pages/NotFound/NotFound";
import Results from "@/pages/Results/Results";
import Settings from "@/pages/Settings/Settings";

const AppRoutes = () => (
  <Routes>
    <Route element={<AppLayout />}>
      <Route path="/" element={<Homepage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/loading/:scanId" element={<LoadingScreen />} />
      <Route path="/results/:scanId?" element={<Results />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/404-not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404-not-found" replace />} />
    </Route>
  </Routes>
);

export default AppRoutes;

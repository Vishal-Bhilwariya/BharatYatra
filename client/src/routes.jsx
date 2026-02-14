import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StateDetails from "./pages/StateDetails";
import CityDetails from "./pages/CityDetails";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminStates from "./pages/admin/AdminStates";
import AdminCities from "./pages/admin/AdminCities";
import AdminPlaces from "./pages/admin/AdminPlaces";
import AdminFoods from "./pages/admin/AdminFoods";
import AdminTransports from "./pages/admin/AdminTransports";
import AdminCulture from "./pages/admin/AdminCulture";
import AdminAddCulture from "./pages/admin/AdminAddCulture";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/state/:stateSlug" element={<StateDetails />} />
        <Route path="/city/:citySlug" element={<CityDetails />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/states" element={<AdminStates />} />
        <Route path="/admin/cities" element={<AdminCities />} />
        <Route path="/admin/places" element={<AdminPlaces />} />
        <Route path="/admin/foods" element={<AdminFoods />} />
        <Route path="/admin/transports" element={<AdminTransports />} />
        <Route path="/admin/culture" element={<AdminCulture />} />
        <Route path="/admin/culture/add" element={<AdminAddCulture />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

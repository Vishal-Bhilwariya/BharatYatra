import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StateDetails from "./pages/StateDetails";
import CityDetails from "./pages/CityDetails";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/state/:stateSlug" element={<StateDetails />} />
        <Route path="/city/:citySlug" element={<CityDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

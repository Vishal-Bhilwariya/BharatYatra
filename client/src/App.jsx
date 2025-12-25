import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CityDetails from "./pages/CityDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/city/:id" element={<CityDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

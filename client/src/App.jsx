import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CityDetails from "./pages/CityDetails";
import Translator from "./pages/Translator";
import StateDetails from "./pages/StateDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/city/:id" element={<CityDetails />} />
        <Route path="/translator" element={<Translator />} />
        <Route path="/state/:id" element={<StateDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

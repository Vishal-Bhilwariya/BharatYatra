import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CityDetails from "./pages/CityDetails";
import Translator from "./pages/Translator";
import StateDetails from "./pages/StateDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/city/:id" element={<CityDetails />} />
          <Route path="/translator" element={<Translator />} />
          <Route path="/state/:id" element={<StateDetails />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

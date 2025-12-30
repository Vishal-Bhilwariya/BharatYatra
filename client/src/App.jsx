import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CityDetails from "./pages/CityDetails";
import Translator from "./pages/Translator";
import StateDetails from "./pages/StateDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Explore from "./pages/Explore";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/translator" element={<Translator />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/state/:slug" element={<StateDetails />} />
          <Route path="/city/:slug" element={<CityDetails />} />

        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

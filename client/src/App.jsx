import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminProvider } from "./context/AdminContext";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import ErrorBoundary from "./components/admin/ErrorBoundary";
import Home from "./pages/Home";
import CityDetails from "./pages/CityDetails";
import Translator from "./pages/Translator";
import StateDetails from "./pages/StateDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ExploreCulture from "./pages/ExploreCulture";
import Recommendations from "./pages/Recommendations";
import Itinerary from "./pages/Itinerary";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminStates from "./pages/admin/AdminStates";
import AdminCities from "./pages/admin/AdminCities";
import AdminPlaces from "./pages/admin/AdminPlaces";
import AdminFoods from "./pages/admin/AdminFoods";
import AdminTransports from "./pages/admin/AdminTransports";

function App() {
  return (
    <ErrorBoundary>
      <AdminProvider>
        <BrowserRouter>
          <Routes>
          {/* Admin Routes - No Header/Footer */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/states"
            element={
              <ProtectedRoute>
                <AdminStates />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/cities"
            element={
              <ProtectedRoute>
                <AdminCities />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/places"
            element={
              <ProtectedRoute>
                <AdminPlaces />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/foods"
            element={
              <ProtectedRoute>
                <AdminFoods />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/transports"
            element={
              <ProtectedRoute>
                <AdminTransports />
              </ProtectedRoute>
            }
          />

          {/* Public Routes - With Header/Footer */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <div className="pt-20">
                  <Home />
                </div>
                <Footer />
              </>
            }
          />
          <Route
            path="/translator"
            element={
              <>
                <Header />
                <div className="pt-20">
                  <Translator />
                </div>
                <Footer />
              </>
            }
          />
          <Route
            path="/explore-culture"
            element={
              <>
                <Header />
                <div className="pt-20">
                  <ExploreCulture />
                </div>
                <Footer />
              </>
            }
          />
          <Route
            path="/explore-culture/:stateSlug"
            element={
              <>
                <Header />
                <div className="pt-20">
                  <ExploreCulture />
                </div>
                <Footer />
              </>
            }
          />
          <Route
            path="/recommendations"
            element={
              <>
                <Header />
                <div className="pt-20">
                  <Recommendations />
                </div>
                <Footer />
              </>
            }
          />
          <Route
            path="/itinerary"
            element={
              <>
                <Header />
                <div className="pt-20">
                  <Itinerary />
                </div>
                <Footer />
              </>
            }
          />
          <Route
            path="/state/:slug"
            element={
              <>
                <Header />
                <div className="pt-20">
                  <StateDetails />
                </div>
                <Footer />
              </>
            }
          />
          <Route
            path="/city/:slug"
            element={
              <>
                <Header />
                <div className="pt-20">
                  <CityDetails />
                </div>
                <Footer />
              </>
            }
          />
          </Routes>
        </BrowserRouter>
      </AdminProvider>
    </ErrorBoundary>
  );
}

export default App;

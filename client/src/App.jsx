import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThemeProvider from "./context/ThemeContext";
import ScrollToTop from "./components/ScrollToTop";
import { AdminProvider } from "./context/AdminContext";
import { AuthProvider } from "./context/AuthContext";
import UserProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/admin/ProtectedRoute";
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
import AdminCulture from "./pages/admin/AdminCulture";
import AdminAddCulture from "./pages/admin/AdminAddCulture";
import ExploreStates from "./pages/ExploreStates";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AdminProvider>
          <ThemeProvider>
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                {/* Admin Routes - No Header/Footer */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin/dashboard"
                  element={
                    <AdminProtectedRoute>
                      <AdminDashboard />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/admin/states"
                  element={
                    <AdminProtectedRoute>
                      <AdminStates />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/admin/cities"
                  element={
                    <AdminProtectedRoute>
                      <AdminCities />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/admin/places"
                  element={
                    <AdminProtectedRoute>
                      <AdminPlaces />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/admin/foods"
                  element={
                    <AdminProtectedRoute>
                      <AdminFoods />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/admin/transports"
                  element={
                    <AdminProtectedRoute>
                      <AdminTransports />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/admin/culture"
                  element={
                    <AdminProtectedRoute>
                      <AdminCulture />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/admin/culture/new"
                  element={
                    <AdminProtectedRoute>
                      <AdminAddCulture />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/admin/culture/edit/:id"
                  element={
                    <AdminProtectedRoute>
                      <AdminAddCulture />
                    </AdminProtectedRoute>
                  }
                />

                {/* Auth Routes - No Header/Footer */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Public Routes - With Header/Footer */}
                <Route
                  path="/"
                  element={
                    <UserProtectedRoute>
                      <Header />
                      <div className="pt-20">
                        <Home />
                      </div>
                      <Footer />
                    </UserProtectedRoute>
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
                <Route
                  path="/explore"
                  element={
                    <>
                      <Header />
                      <div className="pt-20">
                        <ExploreStates />
                      </div>
                      <Footer />
                    </>
                  }
                />
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
        </AdminProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;

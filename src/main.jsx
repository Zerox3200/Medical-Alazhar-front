import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";
import Home from "./pages/home/Home.jsx";

// Auth Routes
import AuthLayout from "./layouts/AuthLayout.jsx";
import Signup from "./pages/auth/signup/Signup.jsx";
import Login from "./pages/auth/Login.jsx";

// Main Routes
import MainLayout from "./layouts/MainLayout.jsx";
import RecordTraining from "./pages/record_training/RecordTraining.jsx";
import Courses from "./pages/Courses.jsx";
import Assessment from "./pages/Assessment.jsx";
import EndRoundReflections from "./pages/EndRoundReflections.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import NotFound from "./pages/NotFound.jsx";
import Procedures from "./pages/record_training/procedures/index.jsx";
import AddCase from "./pages/record_training/cases/add-case/AddCase.jsx";
import CasesSummary from "./pages/record_training/cases/cases-summary/CasesSummary.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Interns from "./pages/interns/Interns.jsx";

// Admin Routes
import AdminUserProfileLayout from "./layouts/AdminUserProfileLayout.jsx";
import Rounds from "./pages/admin/rounds/Rounds.jsx";
import UserProfile from "./pages/admin/user/UserProfile.jsx";

// Utils
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import ResetPassword from "./pages/auth/ResetPassword.jsx";
import InternProfile from "./pages/interns/InternProfile.jsx";
import Loader from "./components/Loader.jsx";
import Supervisors from "./pages/admin/supervisors/Supervisors.jsx";
import Coordinators from "./pages/admin/coordinators/Coordinators.jsx";
import SupervisorProfile from "./pages/admin/supervisors/SupervisorProfile.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate
        loading={
          <div>
            <Loader />
          </div>
        }
        persistor={persistor}
      >
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<MainLayout />}>
                <Route path="*" element={<NotFound />} />
                <Route path="/" index element={<Home />} />
                {/* Admin Routes */}
                <Route path="/admin">
                  {/* <Route path="/admin/" element={<AdminUserProfileLayout />}>
                  </Route> */}
                  <Route path="/admin/rounds" element={<Rounds />} />
                  <Route path="/admin/supervisors" element={<Supervisors />} />
                  <Route
                    path="/admin/supervisors/:supervisorId"
                    element={<SupervisorProfile />}
                  />
                  <Route
                    path="/admin/coordinators"
                    element={<Coordinators />}
                  />

                  <Route path="/admin/interns" element={<Interns />} />
                  <Route
                    path="/admin/interns/:internId"
                    element={<InternProfile />}
                  />
                </Route>

                <Route path="/profile" element={<Profile />} />
                <Route path="/record_training" element={<RecordTraining />}>
                  <Route
                    path="/record_training/cases"
                    element={<CasesSummary />}
                  />
                  <Route
                    path="/record_training/cases/add-case"
                    element={<AddCase />}
                  />
                  <Route
                    path="/record_training/procedures"
                    element={<Procedures />}
                  />
                </Route>
                <Route path="assessment" element={<Assessment />} />
                <Route path="courses" element={<Courses />} />
                <Route
                  path="end_round_reflections"
                  element={<EndRoundReflections />}
                />
                <Route path="courses" element={<Courses />} />
                <Route path="portfolio" element={<Portfolio />} />
                <Route path="contact_us" element={<ContactUs />} />
              </Route>
            </Route>
            <Route path="auth" element={<AuthLayout />}>
              <Route path="signup" element={<Signup />} />
              <Route path="login" element={<Login />} />
              <Route path="reset" element={<ResetPassword />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);

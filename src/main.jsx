import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import "./index.css";
import Home from "./Home.jsx";

// Auth Routes
import AuthLayout from "./layouts/AuthLayout.jsx";
import Signup from "./pages/auth/Signup.jsx";
import Login from "./pages/auth/Login.jsx";

// Main Routes
import MainLayout from "./layouts/MainLayout.jsx";
import RecordTraining from "./pages/record_training/RecordTraining.jsx";
import Courses from "./pages/Courses.jsx";
import Assessment from "./pages/Assessment.jsx";
import EndRoundReflections from "./pages/EndRoundReflections.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import ContactUs from "./pages/ContactUs.jsx";

// Not Found Page
import NotFound from "./pages/NotFound.jsx";
import Procedures from "./pages/record_training/procedures/index.jsx";
import AddCase from "./pages/record_training/cases/add-case/AddCase.jsx";
import CasesSummary from "./pages/record_training/cases/cases-summary/CasesSummary.jsx";
import Profile from "./pages/profile/Index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="*" element={<NotFound />} />
          <Route path="/" index element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/record_training" element={<RecordTraining />}>
            <Route path="/record_training/cases" element={<CasesSummary />} />
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
        <Route path="auth" element={<AuthLayout />}>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

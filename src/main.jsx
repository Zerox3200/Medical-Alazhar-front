import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.jsx";
import Loader from "./components/Loader.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <BrowserRouter>
          <App />

          {/* Protected Routes */}
          {/* <Route element={<ProtectedRoute />}> */}
          {/* Main App Routes */}
          {/* <Route path="/" index element={<Home />} /> */}

          {/* Admin Routes */}
          {/* <Route path="/admin"> */}
          {/* <Route path="/admin/" element={<AdminUserProfileLayout />}>
                  </Route> */}
          {/* <Route path="/admin/rounds" element={<Rounds />} />
                    <Route
                      path="/admin/supervisors"
                      element={<Supervisors />}
                    />
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
                </Route>
              </Route> */}

          {/* End Of Routes */}
          {/* </Routes> */}
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);

////////////////////////////////////////////////////////////////////////////////
/*
 ************************** Admin Layout And Routes **************************
 */
////////////////////////////////////////////////////////////////////////////////
// import AdminUserProfileLayout from "./layouts/AdminUserProfileLayout.jsx";
// import Rounds from "./pages/admin/rounds/Rounds.jsx";
// import UserProfile from "./pages/admin/user/UserProfile.jsx";
// import Supervisors from "./pages/admin/supervisors/Supervisors.jsx";
// import Coordinators from "./pages/admin/coordinators/Coordinators.jsx";
// import SupervisorProfile from "./pages/admin/supervisors/SupervisorProfile.jsx";

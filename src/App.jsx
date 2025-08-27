import React, { Suspense, useEffect, useState } from "react";
import createRoutes from "./routes/index.routes.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Loader from "./components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserQuery } from "./services/common/authApiSlice.js";
import { clearAuth, setAuth } from "./services/slices/authSlice.js";
import axios from "axios";
import { useCookies } from "react-cookie";

export const API_URL = "http://localhost:3000/api/v1";

const App = () => {

  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [Token] = useCookies(["Al-Azhar"]);

  const router = createBrowserRouter(createRoutes(user?.role, token));

  const [UserLoading, setUserLoading] = useState(true);

  const GetUser = async () => {
    if (!Token["Al-Azhar"]) {
      setUserLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${Token["Al-Azhar"]}`
        }
      });

      console.log(data);

      const NeededObject = {
        user: data?.data,
        token: Token["Al-Azhar"]
      }

      // console.log(NeededObject);

      if (data) {
        dispatch(setAuth(NeededObject));
      } else {
        dispatch(clearAuth());
      }

    } catch (error) {
      console.log(error);
    } finally {
      setUserLoading(false);
    }

  }

  useEffect(() => {
    GetUser();
  }, [])

  if (UserLoading) return <Loader />;

  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;

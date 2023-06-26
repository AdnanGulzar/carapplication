import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./components/login/Login";
import Register from "./components/register/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Cars from "./components/dashboard/Cars";
import Category from "./components/dashboard/Category";
import { useMeQuery } from "./store/apis/userApi";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";

function App() {
  const { data, isError } = useMeQuery();
  if (data?.token) localStorage.setItem("token", data?.token);
  if (isError) {
    localStorage.removeItem("token");
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        {/* <Route  path='/' element={<Dashboard/>}>
      <Route path='' element={<Cars />} />
      <Route path='category' element={<Category/>} />
    </Route> */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route
            path="car"
            element={
              <ProtectedRoute>
                <Cars />
              </ProtectedRoute>
            }
          />
          <Route
            path="category"
            element={
              <ProtectedRoute>
                <Category />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="*" element={<h1>No page Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/RegistrationPage";
import Home from "./pages/Home";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/" />
        <Route element={<Registration />} path="/register" />
        <Route
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
          path="/home"
        />
      </Routes>
    </BrowserRouter>
  );
};
export default App;

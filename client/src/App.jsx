import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/RegistrationPage";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/" />
        <Route element={<Registration />} path="/register" />
        <Route
          element={
            <ProtectedRoute path="/">
              <Home />
            </ProtectedRoute>
          }
          path="/home"
        >
          <Route path="chat/:chatId" element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;

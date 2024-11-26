import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import AuthContext from "./context/AuthContext";
import Layout from "./layouts/Layout";
import LoginPage from "./pages/LoginPage";

function App() {
  const { token } = useContext(AuthContext);
  const authUser = token || localStorage.getItem("token");
  console.log("authUser", authUser);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="*"
        element={authUser ? <Layout /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;

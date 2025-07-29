import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Registration from "./views/Registration";
import Login from "./views/Login";
import Home from "./views/Home";
import AuthRedirect from "./components/AuthRedirect";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>} />
        <Route path="/register" element={<AuthRedirect><Registration /></AuthRedirect>} />
        <Route path="/login" element={<AuthRedirect><Login /></AuthRedirect>} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;

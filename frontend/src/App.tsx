import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Registration from "./views/Registration";
import Login from "./views/Login";
import Home from "./views/Home";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;

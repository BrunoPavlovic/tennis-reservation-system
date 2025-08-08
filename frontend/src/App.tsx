import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Registration from "./views/Registration";
import Login from "./views/Login";
import Home from "./views/Home";
import AuthRedirect from "./components/AuthRedirect";
import UnAuthRedirect from "./components/UnAuthRedirect";
import SharedLayout from "./components/SharedLayout";
import Reservation from "./views/Reservation";
import Profile from "./views/Profile";
import Credit from "./views/Credit";
//import PaymentSuccess from "./views/PaymentSuccess";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<AuthRedirect><Registration /></AuthRedirect>} />
        <Route path="/login" element={<AuthRedirect><Login /></AuthRedirect>} />

        <Route element={<SharedLayout />}>
          <Route path="/" element={<Navigate to="/home"/>} />
          <Route path="/home" element={<UnAuthRedirect><Home /></UnAuthRedirect>} />
          <Route path="/reservation" element={<UnAuthRedirect><Reservation /></UnAuthRedirect>} />
          <Route path="/profile" element={<UnAuthRedirect><Profile/></UnAuthRedirect>} />
          <Route path="/credit" element={<UnAuthRedirect><Credit /></UnAuthRedirect>} />
          {/* <Route path="/payment-success" element={<UnAuthRedirect><PaymentSuccess /></UnAuthRedirect>} /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Registration from "./views/Registration";
import Login from "./views/Login";
import Home from "./views/Home";
import AuthRedirect from "./components/AuthRedirect";
import UnAuthRedirect from "./components/UnAuthRedirect";
import AdminRedirect from "./components/AdminRedirect";
import SharedLayout from "./components/SharedLayout";
import AdminLayout from "./components/AdminLayout";
import Reservation from "./views/Reservation";
import Profile from "./views/Profile";
import Credit from "./views/Credit";
import PaymentSuccess from "./views/PaymentSuccess";
import PaymentCancelled from "./views/PaymentCancelled";
import AdminClubs from "./views/AdminClubs";
import AdminCourts from "./views/AdminCourts";
import AdminUsers from "./views/AdminUsers";

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
          <Route path="/balance" element={<UnAuthRedirect><Credit /></UnAuthRedirect>} />
          <Route path="/payment-success" element={<UnAuthRedirect><PaymentSuccess /></UnAuthRedirect>} />
          <Route path="/payment-cancelled" element={<UnAuthRedirect><PaymentCancelled /></UnAuthRedirect>} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Navigate to="/admin/clubs"/>} />
          <Route path="/admin/clubs" element={<AdminRedirect><AdminClubs /></AdminRedirect>} />
          <Route path="/admin/courts" element={<AdminRedirect><AdminCourts /></AdminRedirect>} />
          <Route path="/admin/users" element={<AdminRedirect><AdminUsers /></AdminRedirect>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Header from "./components/Header/Header";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreateRoom from "./pages/Rooms/CreateRoom";
import Rooms from "./pages/Rooms/Rooms";
import Room from "./pages/Room/Room";
import EditRoom from "./pages/EditRoom/EditRoom";
import EditOffer from "./pages/EditOffer/EditOffer";
import OfferDetails from "./pages/OfferDetails/OfferDetails";
import Booking from "./pages/Booking/Booking";
import EditProfile from "./pages/EditProfile/EditProfile";
import SavedAddress from "./pages/SavedAddress/SavedAddress";
import Contact from "./pages/Contact/Contact";
import Offers from "./pages/offers/Offers";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import VerifyResetCode from "./pages/VerifyResetCode/VerifyResetCode";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  return user && user.isAdmin ? children : <Navigate to="/rooms" replace />;
};

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-reset-code" element={<VerifyResetCode />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:id" element={<Room />} />
          <Route path="/rooms/all/:id" element={<Room />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/profile/address" element={<SavedAddress />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/offer/:id" element={<OfferDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/dashboard"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/add-room"
            element={
              <AdminRoute>
                <CreateRoom />
              </AdminRoute>
            }
          />
          <Route
            path="/edit/rooms/:id"
            element={
              <AdminRoute>
                <EditRoom />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/edit-offer/:id"
            element={
              <AdminRoute>
                <EditOffer />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/offers"
            element={
              <AdminRoute>
                <Offers />
              </AdminRoute>
            }
          />

        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        toastStyle={{
          maxWidth: "calc(100vw - 20px)",
          width: "auto",
        }}
      />
    </div>
  );
};

export default App;

import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

import CustomerDashboard from "./pages/CustomerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import DeliveryDashboard from "./pages/DeliveryDashboard";

import CreateOrder from "./pages/CreateOrder";
import MyOrders from "./pages/MyOrders";
import TrackOrder from "./pages/TrackOrder";
import Payments from "./pages/Payments";
import Profile from "./pages/Profile";

import AllOrders from "./pages/AllOrders";
import Users from "./pages/Users";
import DeliveryBoys from "./pages/DeliveryBoys";
import Revenue from "./pages/Revenue";
import Analytics from "./pages/Analytics";

import AssignedOrders from "./pages/AssignedOrders";
import CompletedOrders from "./pages/CompletedOrders";
import Earnings from "./pages/Earnings";
import Ratings from "./pages/Ratings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path= "/signup" element={<Signup />} />

      {/* Customer */}
      <Route path="/customer" element={<CustomerDashboard />} />

      <Route path="/create-order" element={<CreateOrder />} />
      <Route path="/my-orders" element={<MyOrders />} />
      <Route path="/track-order" element={<TrackOrder />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/profile" element={<Profile />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminDashboard />} />

      <Route path="/all-orders" element={<AllOrders />} />
      <Route path="/users" element={<Users />} />
      <Route path="/delivery-boys" element={<DeliveryBoys />} />
      <Route path="/revenue" element={<Revenue />} />
      <Route path="/analytics" element={<Analytics />} />

      {/* Delivery */}
      <Route path="/delivery" element={<DeliveryDashboard />} />

      <Route path="/assigned-orders" element={<AssignedOrders />} />
      <Route path="/completed-orders" element={<CompletedOrders />} />
      <Route path="/earnings" element={<Earnings />} />
      <Route path="/ratings" element={<Ratings />} />

    </Routes>
  );
}

export default App;
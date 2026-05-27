import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaBox,
  FaCheckCircle,
  FaWallet,
  FaStar,
  FaSignOutAlt,
  FaMotorcycle,
} from "react-icons/fa";

import { supabase } from "../supabase";

function DeliveryDashboard() {

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [completedOrders, setCompletedOrders] =
    useState(0);

  const [earnings, setEarnings] =
    useState(0);

  const [rating, setRating] =
    useState(4.9);

  const [selectedOrderId, setSelectedOrderId] =
    useState(null);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    fetchOrders();
  }, []);

  // FETCH ORDERS
  async function fetchOrders() {

    const { data, error } = await supabase
      .from("orders")
      .select("*")

      // SHOW:
      // unassigned orders
      // OR current rider orders

      .or(
        `assigned_delivery_boy.is.null,assigned_delivery_boy.eq.${user.email}`
      )

      .neq("status", "Delivered")

      .order("id", {
        ascending: false,
      });

    console.log("ORDERS:", data);

    if (!error && data) {

      setOrders(data);

      const completed = data.filter(
        (order) =>
          order.status === "Delivered"
      );

      setCompletedOrders(
        completed.length
      );

      const totalEarnings =
        completed.length * 80;

      setEarnings(totalEarnings);

    }

  }

  // LIVE LOCATION TRACKING

  useEffect(() => {

    if (!selectedOrderId) return;

    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    const watchId =
      navigator.geolocation.watchPosition(

        async (position) => {

          const lat =
            position.coords.latitude;

          const lng =
            position.coords.longitude;

          console.log(
            "DELIVERY LOCATION:",
            lat,
            lng
          );

          const { error } =
            await supabase
              .from("orders")
              .update({
                delivery_lat: lat,
                delivery_lng: lng,
              })
              .eq(
                "id",
                selectedOrderId
              );

          if (error) {
            console.log(error);
          }

        },

        (error) => {
          console.log(error);
        },

        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }

      );

    return () =>
      navigator.geolocation.clearWatch(
        watchId
      );

  }, [selectedOrderId]);

  // ACCEPT ORDER

  const acceptOrder = async (
    orderId
  ) => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    setSelectedOrderId(orderId);

    const { error } = await supabase
      .from("orders")
      .update({

        status: "On The Way",

        assigned_delivery_boy:
          user.email,

      })
      .eq("id", orderId);

    if (!error) {

      fetchOrders();

      alert(
        "Order assigned successfully 🚀"
      );

    }

  };

  // MARK DELIVERED

  const markDelivered = async (
    orderId
  ) => {

    const { error } = await supabase
      .from("orders")
      .update({
        status: "Delivered",
      })
      .eq("id", orderId);

    if (!error) {

      fetchOrders();

      alert(
        "Order Delivered Successfully ✅"
      );

    }

  };

  const logout = () => {

    localStorage.removeItem("user");

    navigate("/");

  };

  return (

    <div style={styles.page}>

      <div style={styles.blur1}></div>
      <div style={styles.blur2}></div>

      {/* SIDEBAR */}

      <div style={styles.sidebar}>

        <div>

          <h1 style={styles.logo}>
            Rider 🛵
          </h1>

          <div style={styles.menu}>

            <button
              style={styles.menuBtn}
            >
              <FaBox />
              Assigned Orders
            </button>

            <button
              style={styles.menuBtn}
            >
              <FaCheckCircle />
              Completed Orders
            </button>

            <button
              style={styles.menuBtn}
            >
              <FaWallet />
              Earnings
            </button>

            <button
              style={styles.menuBtn}
            >
              <FaStar />
              Ratings
            </button>

          </div>

        </div>

        <button
          style={styles.logout}
          onClick={logout}
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

      {/* MAIN */}

      <div style={styles.main}>

        <h1 style={styles.heading}>
          Delivery Dashboard
        </h1>

        <p style={styles.subheading}>
          Manage deliveries and track earnings ⚡
        </p>

        {/* CARDS */}

        <div style={styles.cards}>

          <div style={styles.card}>
            <div style={styles.icon}>
              📦
            </div>

            <h2 style={styles.number}>
              {orders.length}
            </h2>

            <p>Assigned Orders</p>

          </div>

          <div style={styles.card}>
            <div style={styles.icon}>
              ✅
            </div>

            <h2 style={styles.number}>
              {completedOrders}
            </h2>

            <p>Completed Orders</p>

          </div>

          <div style={styles.card}>
            <div style={styles.icon}>
              💰
            </div>

            <h2 style={styles.number}>
              ₹{earnings}
            </h2>

            <p>Total Earnings</p>

          </div>

          <div style={styles.card}>
            <div style={styles.icon}>
              ⭐
            </div>

            <h2 style={styles.number}>
              {rating}
            </h2>

            <p>Customer Rating</p>

          </div>

        </div>

        {/* ACTIVE ORDERS */}

        <div style={styles.ordersSection}>

          <h2 style={styles.sectionTitle}>
            Active Orders
          </h2>

          {orders.length === 0 ? (

            <p
              style={{
                color: "white",
                fontSize: "18px",
              }}
            >
              No Orders Found
            </p>

          ) : (

            orders.map((order) => (

              <div
                key={order.id}
                style={styles.orderCard}
              >

                {/* LEFT */}

                <div style={styles.orderInfo}>

                  <h2 style={styles.customerName}>
                    👤 {order.customer_name}
                  </h2>

                  <p style={styles.orderText}>
                    🍔 {order.item}
                  </p>

                  <p style={styles.orderText}>
                    📍 {order.address}
                  </p>

                  <p style={styles.orderText}>
                    🚴 Assigned:
                    {" "}
                    {order.assigned_delivery_boy ||
                      "Not Assigned"}
                  </p>

                  <h3 style={styles.price}>
                    ₹{order.price}
                  </h3>

                </div>

                {/* RIGHT */}

                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >

                  <div
                    style={{
                      ...styles.status,

                      background:
                        order.status ===
                        "Pending"
                          ? "#f59e0b"
                          : order.status ===
                            "Delivered"
                          ? "#22c55e"
                          : "#06b6d4",

                    }}
                  >
                    {order.status}
                  </div>

                  {/* ACCEPT */}

                  {!order.assigned_delivery_boy && (

                    <button
                      style={styles.acceptBtn}
                      onClick={() =>
                        acceptOrder(
                          order.id
                        )
                      }
                    >
                      <FaMotorcycle />
                      Accept
                    </button>

                  )}

                  {/* DELIVERED */}

                  {order.assigned_delivery_boy ===
                    user.email && (
                    <button
                      style={styles.deliveredBtn}
                      onClick={() =>
                        markDelivered(
                          order.id
                        )
                      }
                    >
                      ✅ Delivered
                    </button>
                  )}

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>

  );

}

const styles = {

  page:{
    minHeight:"100vh",
    background:"#020617",
    display:"flex",
    position:"relative",
    overflow:"hidden",
    fontFamily:"Arial"
  },

  blur1:{
    width:"350px",
    height:"350px",
    background:"#06b6d4",
    borderRadius:"50%",
    filter:"blur(160px)",
    position:"absolute",
    top:"-120px",
    left:"-120px",
    opacity:0.5
  },

  blur2:{
    width:"350px",
    height:"350px",
    background:"#2563eb",
    borderRadius:"50%",
    filter:"blur(160px)",
    position:"absolute",
    bottom:"-120px",
    right:"-120px",
    opacity:0.4
  },

  sidebar:{
    width:"280px",
    background:"rgba(255,255,255,0.05)",
    borderRight:"1px solid rgba(255,255,255,0.08)",
    backdropFilter:"blur(18px)",
    padding:"30px",
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-between",
    zIndex:2
  },

  logo:{
    color:"white",
    fontSize:"40px",
    marginBottom:"50px",
    fontWeight:"800"
  },

  menu:{
    display:"flex",
    flexDirection:"column",
    gap:"18px"
  },

  menuBtn:{
    background:"rgba(255,255,255,0.06)",
    border:"1px solid rgba(255,255,255,0.08)",
    padding:"18px",
    borderRadius:"18px",
    color:"white",
    display:"flex",
    alignItems:"center",
    gap:"14px",
    fontSize:"17px",
    cursor:"pointer"
  },

  logout:{
    background:"linear-gradient(to right,#ef4444,#f97316)",
    border:"none",
    padding:"18px",
    borderRadius:"18px",
    color:"white",
    fontSize:"17px",
    cursor:"pointer"
  },

  main:{
    flex:1,
    padding:"40px",
    zIndex:2
  },

  heading:{
    color:"white",
    fontSize:"65px",
    fontWeight:"800"
  },

  subheading:{
    color:"#94a3b8",
    marginTop:"10px",
    fontSize:"18px"
  },

  cards:{
    display:"grid",
    gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
    gap:"25px",
    marginTop:"40px"
  },

  card:{
    background:"rgba(255,255,255,0.06)",
    border:"1px solid rgba(255,255,255,0.08)",
    borderRadius:"30px",
    padding:"35px",
    color:"white",
    backdropFilter:"blur(18px)"
  },

  icon:{
    fontSize:"32px",
    marginBottom:"20px"
  },

  number:{
    fontSize:"48px",
    color:"#38bdf8"
  },

  ordersSection:{
    marginTop:"45px"
  },

  sectionTitle:{
    color:"white",
    fontSize:"34px",
    marginBottom:"25px"
  },

  orderCard:{
    background:"rgba(255,255,255,0.06)",
    border:"1px solid rgba(255,255,255,0.08)",
    padding:"25px",
    borderRadius:"24px",
    marginBottom:"18px",
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    color:"white"
  },

  orderInfo:{
    display:"flex",
    flexDirection:"column",
    gap:"10px"
  },

  customerName:{
    fontSize:"24px",
    fontWeight:"700",
    color:"white"
  },

  orderText:{
    color:"#cbd5e1",
    fontSize:"16px"
  },

  price:{
    color:"#38bdf8",
    fontSize:"22px",
    fontWeight:"700"
  },

  status:{
    padding:"12px 18px",
    borderRadius:"14px",
    color:"white",
    fontWeight:"bold"
  },

  acceptBtn:{
    background:"#06b6d4",
    border:"none",
    padding:"12px 18px",
    borderRadius:"14px",
    color:"white",
    cursor:"pointer",
    display:"flex",
    alignItems:"center",
    gap:"10px",
    fontWeight:"bold"
  },

  deliveredBtn:{
    background:"#22c55e",
    border:"none",
    padding:"12px 18px",
    borderRadius:"14px",
    color:"white",
    cursor:"pointer",
    fontWeight:"bold"
  }

};

export default DeliveryDashboard;
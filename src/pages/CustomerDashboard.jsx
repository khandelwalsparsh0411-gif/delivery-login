import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaPlus,
  FaBox,
  FaTruck,
  FaWallet,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import { supabase } from "../supabase";

function CustomerDashboard() {

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [deliveredOrders, setDeliveredOrders] = useState(0);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {

  try {

    const { data: userData, error: userError } =
      await supabase.auth.getUser();

    if (userError || !userData.user) {
      console.log(userError);
      return;
    }

    const user = userData.user;

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("customer_id", user.email)
      .order("id", { ascending: false });

    if (error) {

      console.log(error);

      return;

    }

    console.log(data);

    setOrders(data);

    setTotalOrders(data.length);

    const pending = data.filter(
      (order) => order.status !== "Delivered"
    );

    const delivered = data.filter(
      (order) => order.status === "Delivered"
    );

    setPendingOrders(pending.length);

    setDeliveredOrders(delivered.length);

  } catch (err) {

    console.log(err);

  }

}

  const logout = async () => {

    await supabase.auth.signOut();

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
            FoodX 🚀
          </h1>

          <div style={styles.menu}>

            <button style={styles.menuBtn}>
              <FaHome />
              Dashboard
            </button>

            <button
              style={styles.menuBtn}
              onClick={() => navigate("/create-order")}
            >
              <FaPlus />
              Create Order
            </button>

            <button
              style={styles.menuBtn}
              onClick={() => navigate("/my-orders")}
            >
              <FaBox />
              My Orders
            </button>

            <button
              style={styles.menuBtn}
              onClick={() => navigate("/track-order")}
            >
              <FaTruck />
              Track Order
            </button>

            <button
              style={styles.menuBtn}
              onClick={() => navigate("/payments")}
            >
              <FaWallet />
              Payments
            </button>

            <button
              style={styles.menuBtn}
              onClick={() => navigate("/profile")}
            >
              <FaUser />
              Profile
            </button>

          </div>

        </div>

        <button style={styles.logout} onClick={logout}>
          <FaSignOutAlt />
          Logout
        </button>

      </div>

      {/* MAIN */}

      <div style={styles.main}>

        <div style={styles.topBar}>

          <div>

            <h1 style={styles.heading}>
              Customer Dashboard
            </h1>

            <p style={styles.subheading}>
              Welcome back 👋 Manage your food orders instantly.
            </p>

          </div>

          <div style={styles.profileBox}>
            🍔 Premium User
          </div>

        </div>

        {/* STATS */}

        <div style={styles.cards}>

          <div style={styles.card}>

            <div style={styles.iconCircle}>
              📦
            </div>

            <h2 style={styles.number}>
              {totalOrders}
            </h2>

            <p style={styles.cardText}>
              Total Orders
            </p>

          </div>

          <div style={styles.card}>

            <div style={styles.iconCircle}>
              ⏳
            </div>

            <h2 style={styles.number}>
              {pendingOrders}
            </h2>

            <p style={styles.cardText}>
              Pending Orders
            </p>

          </div>

          <div style={styles.card}>

            <div style={styles.iconCircle}>
              ✅
            </div>

            <h2 style={styles.number}>
              {deliveredOrders}
            </h2>

            <p style={styles.cardText}>
              Delivered Orders
            </p>

          </div>

        </div>

        {/* RECENT ORDERS */}

        <div style={styles.ordersSection}>

          <div style={styles.sectionHeader}>

            <h2 style={styles.sectionTitle}>
              Recent Orders
            </h2>

            <button
              style={styles.createBtn}
              onClick={() => navigate("/create-order")}
            >
              + New Order
            </button>

          </div>

          {orders.length === 0 ? (

            <div style={styles.emptyCard}>
              No orders yet 🍔
            </div>

          ) : (

            orders.slice(0, 5).map((order) => (

              <div key={order.id} style={styles.orderCard}>

                <div>

                  <h3 style={styles.orderItem}>
                    {order.item}
                  </h3>

                  <p style={styles.orderAddress}>
                    📍 {order.address}
                  </p>

                </div>

                <div
                  style={{
                    ...styles.status,
                    background:
                      order.status === "Delivered"
                        ? "#16a34a"
                        : "#f59e0b",
                  }}
                >
                  {order.status}
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
    overflow:"hidden",
    position:"relative",
    fontFamily:"Arial"
  },

  blur1:{
    width:"350px",
    height:"350px",
    background:"#2563eb",
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
    background:"#9333ea",
    borderRadius:"50%",
    filter:"blur(160px)",
    position:"absolute",
    bottom:"-120px",
    right:"-120px",
    opacity:0.5
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
    fontSize:"42px",
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
    cursor:"pointer",
    backdropFilter:"blur(18px)"
  },

  logout:{
    background:"linear-gradient(to right,#ef4444,#f97316)",
    border:"none",
    padding:"18px",
    borderRadius:"18px",
    color:"white",
    fontSize:"17px",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    gap:"10px",
    cursor:"pointer",
    fontWeight:"600"
  },

  main:{
    flex:1,
    padding:"40px",
    zIndex:2
  },

  topBar:{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    flexWrap:"wrap",
    gap:"20px"
  },

  profileBox:{
    background:"rgba(255,255,255,0.08)",
    border:"1px solid rgba(255,255,255,0.08)",
    padding:"15px 25px",
    borderRadius:"18px",
    color:"white"
  },

  heading:{
    color:"white",
    fontSize:"60px",
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
    backdropFilter:"blur(18px)",
    color:"white",
    boxShadow:"0 0 30px rgba(59,130,246,0.12)"
  },

  iconCircle:{
    width:"70px",
    height:"70px",
    borderRadius:"20px",
    background:"rgba(255,255,255,0.08)",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    fontSize:"28px",
    marginBottom:"20px"
  },

  number:{
    fontSize:"52px",
    color:"#60a5fa",
    marginBottom:"10px"
  },

  cardText:{
    color:"#cbd5e1",
    fontSize:"18px"
  },

  ordersSection:{
    marginTop:"45px"
  },

  sectionHeader:{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    marginBottom:"25px",
    flexWrap:"wrap",
    gap:"15px"
  },

  sectionTitle:{
    color:"white",
    fontSize:"34px"
  },

  createBtn:{
    background:"linear-gradient(to right,#3b82f6,#9333ea)",
    border:"none",
    padding:"16px 24px",
    borderRadius:"16px",
    color:"white",
    fontSize:"16px",
    cursor:"pointer",
    fontWeight:"700"
  },

  emptyCard:{
    background:"rgba(255,255,255,0.06)",
    padding:"40px",
    borderRadius:"28px",
    color:"white",
    textAlign:"center",
    border:"1px solid rgba(255,255,255,0.08)"
  },

  orderCard:{
    background:"rgba(255,255,255,0.06)",
    border:"1px solid rgba(255,255,255,0.08)",
    borderRadius:"25px",
    padding:"25px",
    marginBottom:"20px",
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    color:"white",
    backdropFilter:"blur(18px)"
  },

  orderItem:{
    fontSize:"24px",
    marginBottom:"10px"
  },

  orderAddress:{
    color:"#cbd5e1"
  },

  status:{
    padding:"12px 20px",
    borderRadius:"14px",
    color:"white",
    fontWeight:"700"
  }

};

export default CustomerDashboard;
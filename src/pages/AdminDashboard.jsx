import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaClipboardList,
  FaUsers,
  FaMotorcycle,
  FaMoneyBillWave,
  FaChartLine,
  FaSignOutAlt,
} from "react-icons/fa";

import { supabase } from "../supabase";

function AdminDashboard() {

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {

    // FETCH ORDERS

    const { data: ordersData, error: ordersError } = await supabase
      .from("orders")
      .select("*")
      .neq("status", "Delivered")
      .order("id", { ascending: false });

    console.log("ORDERS DATA:", ordersData);
    console.log("ORDERS ERROR:", ordersError);

    // FETCH USERS

    const { data: usersData, error: usersError } = await supabase
      .from("users")
      .select("*");

    console.log("USERS DATA:", usersData);
    console.log("USERS ERROR:", usersError);

    // SET ORDERS

    if (ordersData) {

      setOrders(ordersData);

      const totalRevenue = ordersData.reduce(
        (total, order) => total + (Number(order.price) || 0),
        0
      );

      setRevenue(totalRevenue);
    }

    // SET USERS

    if (usersData) {

      setUsers(usersData);

      const riders = usersData.filter(
        (user) => user.role === "delivery"
      );

      setDeliveryBoys(riders);
    }
  }

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
            Admin 👑
          </h1>

          <div style={styles.menu}>

            <button
              style={styles.menuBtn}
              onClick={() => navigate("/all-orders")}
            >
              <FaClipboardList />
              All Orders
            </button>

            <button
              style={styles.menuBtn}
              onClick={() => navigate("/users")}
            >
              <FaUsers />
              Users
            </button>

            <button
              style={styles.menuBtn}
              onClick={() => navigate("/delivery-boys")}
            >
              <FaMotorcycle />
              Delivery Boys
            </button>

            <button
              style={styles.menuBtn}
              onClick={() => navigate("/revenue")}
            >
              <FaMoneyBillWave />
              Revenue
            </button>

            <button
              style={styles.menuBtn}
              onClick={() => navigate("/analytics")}
            >
              <FaChartLine />
              Analytics
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

        <h1 style={styles.heading}>
          Admin Dashboard
        </h1>

        <p style={styles.subheading}>
          Manage users, orders and platform analytics 🚀
        </p>

        {/* STATS */}

        <div style={styles.cards}>

          <div style={styles.card}>
            <div style={styles.icon}>📦</div>

            <h2 style={styles.number}>
              {orders.length}
            </h2>

            <p>Total Orders</p>
          </div>

          <div style={styles.card}>
            <div style={styles.icon}>👥</div>

            <h2 style={styles.number}>
              {users.length}
            </h2>

            <p>Total Users</p>
          </div>

          <div style={styles.card}>
            <div style={styles.icon}>🛵</div>

            <h2 style={styles.number}>
              {deliveryBoys.length}
            </h2>

            <p>Delivery Boys</p>
          </div>

          <div style={styles.card}>
            <div style={styles.icon}>💰</div>

            <h2 style={styles.number}>
              ₹{revenue}
            </h2>

            <p>Total Revenue</p>
          </div>

        </div>

        {/* RECENT ORDERS */}

        <div style={styles.ordersSection}>

          <h2 style={styles.sectionTitle}>
            Recent Orders
          </h2>

          {orders.length === 0 ? (

            <p style={{ color: "white", fontSize: "18px" }}>
              No Orders Found
            </p>

          ) : (

            orders.slice(0, 5).map((order) => (

              <div key={order.id} style={styles.orderCard}>

                <div>

                  <h3 style={styles.orderItem}>
                    {order.item_name}
                  </h3>

                  <p style={styles.orderAddress}>
                    👤 {order.customer_id}
                  </p>

                  <p style={{
                    marginTop: "8px",
                    color: "#fbbf24",
                    fontWeight: "bold"
                  }}>
                    ₹{order.price}
                  </p>

                </div>

                <div style={{
                  ...styles.status,
                  background:
                    order.status === "pending"
                      ? "#f59e0b"
                      : order.status === "delivered"
                      ? "#22c55e"
                      : "#2563eb"
                }}>
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
    position:"relative",
    overflow:"hidden",
    fontFamily:"Arial"
  },

  blur1:{
    width:"350px",
    height:"350px",
    background:"#ef4444",
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
    background:"#f59e0b",
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
    color:"#f59e0b"
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

  orderItem:{
    fontSize:"24px"
  },

  orderAddress:{
    color:"#cbd5e1",
    marginTop:"8px"
  },

  status:{
    padding:"12px 18px",
    borderRadius:"14px",
    color:"white",
    fontWeight:"bold"
  }

};

export default AdminDashboard;
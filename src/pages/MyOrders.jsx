import React, { useEffect, useState } from "react";

import {
  FaBoxOpen,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

import { supabase } from "../supabase";

export default function MyOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    fetchOrders();

  }, []);

  async function fetchOrders() {

    try {

      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return;
      console.log(user); 

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("customer_id", user.email)
        .order("id", { ascending: false });

      console.log("MY ORDERS:", data);

      console.log("ERROR:", error);

      if (error) {

        console.log(error);

        return;

      }

      setOrders(data || []);

    } catch (err) {

      console.log(err);

    }

  }

  function getOrderIcon(status) {

    if (status === "Delivered") {

      return <FaCheckCircle size={22}/>;

    }

    if (status === "Out for Delivery") {

      return <FaBoxOpen size={22}/>;

    }

    return <FaClock size={22}/>;

  }

  function getStatusColor(status) {

    if (status === "Delivered") {

      return "#22c55e";

    }

    if (status === "Out for Delivery") {

      return "#38bdf8";

    }

    return "#f59e0b";

  }

  return (

    <div style={styles.page}>

      <div style={styles.blur1}></div>

      <div style={styles.blur2}></div>

      <div style={styles.container}>

        <div style={styles.left}>

          <h1 style={styles.title}>
            My Orders 📦
          </h1>

          <p style={styles.subtitle}>
            Track and manage all your delicious orders
          </p>

          <div style={styles.infoCard}>

            <h2 style={{fontSize:"28px"}}>
              🍔 Food Delivery
            </h2>

            <p style={{
              marginTop:"10px",
              color:"#94a3b8"
            }}>
              Fast • Secure • Live Tracking
            </p>

          </div>

        </div>

        <div style={styles.right}>

          {orders.length === 0 ? (

            <div style={styles.emptyCard}>
              No Orders Yet 🍔
            </div>

          ) : (

            orders.map((order,index)=>(

              <div key={index} style={styles.orderCard}>

                <div style={styles.topRow}>

                  <div style={styles.iconBox}>

                    {getOrderIcon(order.status)}

                  </div>

                  <div
                    style={{
                      ...styles.status,
                      background:getStatusColor(order.status)
                    }}
                  >
                    {order.status}
                  </div>

                </div>

                <h2 style={styles.item}>
                  {order.item}
                </h2>

                <p style={styles.orderId}>
                  Order ID: #{order.id}
                </p>

                <p style={styles.orderId}>
                  📍 {order.address}
                </p>

                <div style={styles.bottomRow}>

                  <h1 style={styles.price}>
                    ₹ {order.price || 0}
                  </h1>

                  <button style={styles.button}>
                    View Details
                  </button>

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
    position:"relative",
    overflow:"hidden",
    padding:"50px"
  },

  blur1:{
    width:"350px",
    height:"350px",
    background:"#2563eb",
    borderRadius:"50%",
    filter:"blur(160px)",
    position:"absolute",
    top:"-100px",
    left:"-100px",
    opacity:0.5
  },

  blur2:{
    width:"350px",
    height:"350px",
    background:"#9333ea",
    borderRadius:"50%",
    filter:"blur(160px)",
    position:"absolute",
    bottom:"-100px",
    right:"-100px",
    opacity:0.5
  },

  container:{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    gap:"50px",
    flexWrap:"wrap",
    position:"relative",
    zIndex:2
  },

  left:{
    flex:1,
    minWidth:"320px"
  },

  title:{
    fontSize:"75px",
    color:"white",
    lineHeight:"90px",
    marginBottom:"20px",
    fontWeight:"800"
  },

  subtitle:{
    color:"#94a3b8",
    fontSize:"20px",
    marginBottom:"40px",
    maxWidth:"450px"
  },

  infoCard:{
    background:"rgba(255,255,255,0.06)",
    border:"1px solid rgba(255,255,255,0.08)",
    backdropFilter:"blur(18px)",
    padding:"30px",
    borderRadius:"30px",
    color:"white",
    width:"420px",
    boxShadow:"0 0 30px rgba(59,130,246,0.2)"
  },

  right:{
    flex:1,
    minWidth:"350px"
  },

  orderCard:{
    background:"rgba(255,255,255,0.06)",
    border:"1px solid rgba(255,255,255,0.08)",
    backdropFilter:"blur(18px)",
    borderRadius:"30px",
    padding:"28px",
    marginBottom:"25px",
    color:"white",
    boxShadow:"0 0 25px rgba(59,130,246,0.12)"
  },

  topRow:{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center"
  },

  iconBox:{
    width:"55px",
    height:"55px",
    borderRadius:"16px",
    background:"rgba(255,255,255,0.08)",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    color:"#60a5fa"
  },

  status:{
    padding:"10px 18px",
    borderRadius:"14px",
    fontSize:"14px",
    fontWeight:"600",
    color:"white"
  },

  item:{
    marginTop:"25px",
    fontSize:"32px"
  },

  orderId:{
    marginTop:"10px",
    color:"#94a3b8"
  },

  bottomRow:{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    marginTop:"30px",
    flexWrap:"wrap",
    gap:"20px"
  },

  price:{
    fontSize:"38px",
    color:"#60a5fa"
  },

  button:{
    padding:"16px 28px",
    border:"none",
    borderRadius:"16px",
    background:"linear-gradient(to right,#2563eb,#9333ea)",
    color:"white",
    fontSize:"16px",
    fontWeight:"600",
    cursor:"pointer",
    boxShadow:"0 0 25px rgba(59,130,246,0.3)"
  },

  emptyCard:{
    background:"rgba(255,255,255,0.06)",
    border:"1px solid rgba(255,255,255,0.08)",
    backdropFilter:"blur(18px)",
    borderRadius:"30px",
    padding:"28px",
    color:"white",
    fontSize:"24px",
    textAlign:"center"
  }

};
import React, { useEffect, useState } from "react";

import { FaCreditCard } from "react-icons/fa";

import { supabase } from "../supabase";

export default function Payments() {

  const [totalAmount, setTotalAmount] = useState(0);

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    fetchPayments();

  }, []);

  async function fetchPayments() {

    try {

      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return;

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("customer_id", user.email)
        .order("id", { ascending: false });

      console.log("PAYMENTS DATA:", data);

      console.log("ERROR:", error);

      if (error) {

        console.log(error);

        return;

      }

      setOrders(data);

      // TOTAL PRICE CALCULATION

      const total = data.reduce((sum, order) => {

        return sum + (Number(order.price) || 0);

      }, 0);

      setTotalAmount(total);

    } catch (err) {

      console.log(err);

    }

  }

  function handlePayment() {

    alert("Payment Successful ✅");

  }

  return (

    <div style={styles.page}>

      <div style={styles.blur}></div>

      <div style={styles.card}>

        <FaCreditCard
          size={70}
          color="#38bdf8"
        />

        <h1 style={styles.heading}>
          Payments 💳
        </h1>

        <div style={styles.amountBox}>
          ₹ {totalAmount}
        </div>

        <div style={styles.ordersBox}>

          {orders.length === 0 ? (

            <p style={styles.emptyText}>
              No Orders Found 🍔
            </p>

          ) : (

            orders.map((order,index)=>(

              <div
                key={index}
                style={styles.orderItem}
              >

                <div>

                  <h3>
                    {order.item}
                  </h3>

                  <p style={styles.address}>
                    📍 {order.address}
                  </p>

                </div>

                <h3>
                  ₹ {order.price || 0}
                </h3>

              </div>

            ))

          )}

        </div>

        <button
          style={styles.button}
          onClick={handlePayment}
        >
          Pay Now
        </button>

      </div>

    </div>

  );
}

const styles = {

  page:{
    minHeight:"100vh",
    background:"#020617",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    position:"relative",
    overflow:"hidden",
    padding:"30px"
  },

  blur:{
    width:"350px",
    height:"350px",
    background:"#9333ea",
    borderRadius:"50%",
    filter:"blur(150px)",
    position:"absolute",
    opacity:0.5
  },

  card:{
    width:"100%",
    maxWidth:"550px",
    padding:"45px",
    borderRadius:"35px",
    background:"rgba(255,255,255,0.06)",
    border:"1px solid rgba(255,255,255,0.08)",
    textAlign:"center",
    backdropFilter:"blur(18px)",
    color:"white",
    zIndex:2
  },

  heading:{
    fontSize:"45px",
    marginTop:"20px",
    marginBottom:"30px"
  },

  amountBox:{
    padding:"30px",
    borderRadius:"25px",
    background:"rgba(255,255,255,0.08)",
    marginBottom:"30px",
    fontSize:"40px",
    fontWeight:"700"
  },

  ordersBox:{
    marginBottom:"30px",
    maxHeight:"300px",
    overflowY:"auto",
  },

  orderItem:{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    padding:"18px",
    marginBottom:"15px",
    borderRadius:"18px",
    background:"rgba(255,255,255,0.06)",
    textAlign:"left",
  },

  address:{
    color:"#94a3b8",
    marginTop:"5px",
    fontSize:"14px"
  },

  emptyText:{
    color:"#94a3b8",
    fontSize:"18px"
  },

  button:{
    width:"100%",
    padding:"18px",
    border:"none",
    borderRadius:"18px",
    background:"linear-gradient(to right,#2563eb,#9333ea)",
    color:"white",
    fontSize:"18px",
    cursor:"pointer",
    fontWeight:"700"
  }

};
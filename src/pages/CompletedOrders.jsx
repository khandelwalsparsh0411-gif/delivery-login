import React, { useEffect, useState } from "react";

import { FaCheckCircle } from "react-icons/fa";

import { supabase } from "../supabase";

import commonStyles from "./commonStyles";

export default function CompletedOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    fetchCompletedOrders();

  }, []);

  async function fetchCompletedOrders() {

    try {

      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return;

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("status", "Delivered")
        .order("id", { ascending: false });

      console.log("COMPLETED ORDERS:", data);

      console.log("ERROR:", error);

      if (error) {

        console.log(error);

        return;

      }

      setOrders(data);

    } catch (err) {

      console.log(err);

    }

  }

  return (

    <div style={styles.page}>

      <div style={styles.blur}></div>

      <h1 style={styles.title}>
        Completed Orders ✅
      </h1>

      <div style={styles.grid}>

        {orders.length === 0 ? (

          <div style={styles.emptyCard}>
            No Completed Orders ✅
          </div>

        ) : (

          orders.map((order,index)=>(

            <div key={index} style={styles.orderCard}>

              <FaCheckCircle
                size={40}
                color="#4ade80"
              />

              <h2>
                {order.item}
              </h2>

              <p>
                👤 {order.customer_name}
              </p>

              <p>
                📍 {order.address}
              </p>

              <p>
                ✅ {order.status}
              </p>

            </div>

          ))

        )}

      </div>

    </div>

  );
}

const styles = {

  ...commonStyles,

  emptyCard:{
    background:"rgba(255,255,255,0.06)",
    padding:"30px",
    borderRadius:"20px",
    color:"white",
    fontSize:"20px",
  }

};
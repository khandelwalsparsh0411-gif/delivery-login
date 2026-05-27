import React, { useEffect, useState } from "react";

import { FaBox } from "react-icons/fa";

import { supabase } from "../supabase";

import commonStyles from "./commonStyles";

export default function AssignedOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    fetchOrders();

  }, []);

  async function fetchOrders() {

    try {

      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return;

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .neq("status", "Delivered")
        .order("id", { ascending: false });

      console.log("ASSIGNED ORDERS:", data);

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
        Assigned Orders 📦
      </h1>

      <div style={styles.grid}>

        {orders.length === 0 ? (

          <div style={styles.emptyCard}>
            No Assigned Orders 🚚
          </div>

        ) : (

          orders.map((order,index)=>(

            <div key={index} style={styles.orderCard}>

              <FaBox size={40} color="#38bdf8"/>

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
                🚚 {order.status}
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
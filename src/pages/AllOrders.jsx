import React, { useEffect, useState } from "react";

import { FaClipboardList } from "react-icons/fa";

import { supabase } from "../supabase";

import commonStyles from "./commonStyles";

export default function AllOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    fetchOrders();

  }, []);

  async function fetchOrders() {

    try {

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("id", { ascending: false });

      console.log("ALL ORDERS:", data);

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

  async function updateStatus(id, status) {

    const { error } = await supabase
      .from("orders")
      .update({
        status: status,
      })
      .eq("id", id);

    if (error) {

      console.log(error);

      return;

    }

    fetchOrders();

  }

  return (

    <div style={styles.page}>

      <div style={styles.blur}></div>

      <div style={styles.container}>

        <div style={styles.left}>

          <h1 style={styles.title}>
            All Orders 📦
          </h1>

          <p style={styles.subtitle}>
            Manage all customer orders
          </p>

        </div>

        <div style={styles.right}>

          {orders.length === 0 ? (

            <div style={styles.emptyCard}>
              No Orders Found 📭
            </div>

          ) : (

            orders.map((order,index)=>(

              <div key={index} style={styles.card}>

                <FaClipboardList
                  size={35}
                  color="#38bdf8"
                />

                <div style={styles.info}>

                  <h2>
                    {order.customer_name}
                  </h2>

                  <p>
                    🍔 {order.item}
                  </p>

                  <p>
                    📍 {order.address}
                  </p>

                </div>

                <div style={styles.actions}>

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

                  <button
                    style={styles.button}
                    onClick={() =>
                      updateStatus(
                        order.id,
                        "Delivered"
                      )
                    }
                  >
                    Deliver
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

  ...commonStyles,

  info:{
    flex:1,
  },

  actions:{
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    gap:"10px",
  },

  button:{
    padding:"10px 18px",
    border:"none",
    borderRadius:"12px",
    background:"#38bdf8",
    color:"white",
    fontWeight:"700",
    cursor:"pointer",
  },

  emptyCard:{
    background:"rgba(255,255,255,0.06)",
    padding:"30px",
    borderRadius:"20px",
    color:"white",
    fontSize:"20px",
  }

};
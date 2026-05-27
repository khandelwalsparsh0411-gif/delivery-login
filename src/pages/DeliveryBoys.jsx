import React, { useEffect, useState } from "react";

import { FaMotorcycle } from "react-icons/fa";

import { supabase } from "../supabase";

import commonStyles from "./commonStyles";

export default function DeliveryBoys() {

  const [deliveryBoys, setDeliveryBoys] = useState([]);

  useEffect(() => {

    fetchDeliveryBoys();

  }, []);

  async function fetchDeliveryBoys() {

    try {

      // USERS TABLE SE DELIVERY ROLE WALE USERS

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("role", "delivery");

      console.log("DELIVERY BOYS:", data);

      console.log("ERROR:", error);

      if (error) {

        console.log(error);

        return;

      }

      setDeliveryBoys(data);

    } catch (err) {

      console.log(err);

    }

  }

  return (

    <div style={styles.page}>

      <div style={styles.blur}></div>

      <h1 style={styles.title}>
        Delivery Boys 🛵
      </h1>

      <div style={styles.grid}>

        {deliveryBoys.length === 0 ? (

          <div style={styles.emptyCard}>
            No Delivery Boys Found 🛵
          </div>

        ) : (

          deliveryBoys.map((boy,index)=>(

            <div key={index} style={styles.userCard}>

              <FaMotorcycle
                size={60}
                color="#38bdf8"
              />

              <h2>
                {boy.name || "Delivery Boy"}
              </h2>

              <p>
                {boy.email}
              </p>

              <p style={styles.active}>
                Active Now
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

  active:{
    color:"#4ade80",
    fontWeight:"700",
    marginTop:"10px",
  },

  emptyCard:{
    background:"rgba(255,255,255,0.06)",
    padding:"30px",
    borderRadius:"20px",
    color:"white",
    fontSize:"20px",
  }

};
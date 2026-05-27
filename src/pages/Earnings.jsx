import React, { useEffect, useState } from "react";

import { FaWallet } from "react-icons/fa";

import { supabase } from "../supabase";

import commonStyles from "./commonStyles";

export default function Earnings() {

  const [earnings, setEarnings] = useState(0);

  useEffect(() => {

    fetchEarnings();

  }, []);

  async function fetchEarnings() {

    try {

      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return;

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("status", "Delivered");

      console.log("EARNINGS DATA:", data);

      console.log("ERROR:", error);

      if (error) {

        console.log(error);

        return;

      }

      const total = data.reduce((sum, order) => {

        return sum + (Number(order.price) || 0);

      }, 0);

      setEarnings(total);

    } catch (err) {

      console.log(err);

    }

  }

  return (

    <div style={styles.page}>

      <div style={styles.blur}></div>

      <div style={styles.revenueCard}>

        <FaWallet
          size={70}
          color="#38bdf8"
        />

        <h1 style={styles.bigText}>
          ₹ {earnings}
        </h1>

        <p>
          Your Total Earnings
        </p>

      </div>

    </div>

  );
}

const styles = commonStyles;
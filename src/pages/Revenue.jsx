import React, { useEffect, useState } from "react";

import { FaDollarSign } from "react-icons/fa";

import { supabase } from "../supabase";

import commonStyles from "./commonStyles";

export default function Revenue() {

  const [revenue, setRevenue] = useState(0);

  useEffect(() => {

    fetchRevenue();

  }, []);

  async function fetchRevenue() {

    try {

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("status", "Delivered");

      console.log("REVENUE DATA:", data);

      console.log("ERROR:", error);

      if (error) {

        console.log(error);

        return;

      }

      // TOTAL REVENUE CALCULATE

      const totalRevenue = data.reduce((sum, order) => {

        return sum + (Number(order.price) || 0);

      }, 0);

      setRevenue(totalRevenue);

    } catch (err) {

      console.log(err);

    }

  }

  return (

    <div style={styles.page}>

      <div style={styles.blur}></div>

      <div style={styles.revenueCard}>

        <FaDollarSign
          size={70}
          color="#4ade80"
        />

        <h1 style={styles.bigText}>
          ₹ {revenue}
        </h1>

        <p>
          Total Revenue This Month
        </p>

      </div>

    </div>

  );
}

const styles = commonStyles;
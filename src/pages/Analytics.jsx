import React, { useEffect, useState } from "react";

import { FaChartLine } from "react-icons/fa";

import { supabase } from "../supabase";

import commonStyles from "./commonStyles";

export default function Analytics() {

  const [ordersGrowth, setOrdersGrowth] = useState(0);

  const [revenueGrowth, setRevenueGrowth] = useState(0);

  useEffect(() => {

    fetchAnalytics();

  }, []);

  async function fetchAnalytics() {

    try {

      const { data, error } = await supabase
        .from("orders")
        .select("*");

      console.log("ANALYTICS DATA:", data);

      console.log("ERROR:", error);

      if (error) {

        console.log(error);

        return;

      }

      // TOTAL ORDERS

      const totalOrders = data.length;

      // DELIVERED ORDERS

      const deliveredOrders = data.filter(
        (order) => order.status === "Delivered"
      );

      // REVENUE

      const totalRevenue = deliveredOrders.reduce((sum, order) => {

        return sum + (Number(order.price) || 0);

      }, 0);

      // SIMPLE GROWTH LOGIC

      const ordersGrowthPercent =
        totalOrders > 0
          ? Math.min(totalOrders * 5, 100)
          : 0;

      const revenueGrowthPercent =
        totalRevenue > 0
          ? Math.min(Math.floor(totalRevenue / 100), 100)
          : 0;

      setOrdersGrowth(ordersGrowthPercent);

      setRevenueGrowth(revenueGrowthPercent);

    } catch (err) {

      console.log(err);

    }

  }

  return (

    <div style={styles.page}>

      <div style={styles.blur}></div>

      <h1 style={styles.title}>
        Analytics 📊
      </h1>

      <div style={styles.grid}>

        <div style={styles.analyticsCard}>

          <FaChartLine
            size={45}
            color="#38bdf8"
          />

          <h2>
            Orders Growth
          </h2>

          <p>
            +{ordersGrowth}%
          </p>

        </div>

        <div style={styles.analyticsCard}>

          <FaChartLine
            size={45}
            color="#a855f7"
          />

          <h2>
            Revenue Growth
          </h2>

          <p>
            +{revenueGrowth}%
          </p>

        </div>

      </div>

    </div>

  );
}

const styles = commonStyles;
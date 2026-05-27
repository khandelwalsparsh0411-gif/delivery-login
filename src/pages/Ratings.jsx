import React, { useEffect, useState } from "react";

import { FaStar } from "react-icons/fa";

import { supabase } from "../supabase";

import commonStyles from "./commonStyles";

export default function Ratings() {

  const [rating, setRating] = useState(0);

  useEffect(() => {

    fetchRatings();

  }, []);

  async function fetchRatings() {

    try {

      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return;

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("status", "Delivered");

      console.log("RATINGS DATA:", data);

      console.log("ERROR:", error);

      if (error) {

        console.log(error);

        return;

      }

      // DYNAMIC RATING LOGIC

      let calculatedRating = 0;

      if (data.length >= 10) {

        calculatedRating = 5.0;

      } else if (data.length >= 7) {

        calculatedRating = 4.8;

      } else if (data.length >= 5) {

        calculatedRating = 4.5;

      } else if (data.length >= 3) {

        calculatedRating = 4.2;

      } else if (data.length >= 1) {

        calculatedRating = 4.0;

      } else {

        calculatedRating = 0;

      }

      setRating(calculatedRating);

    } catch (err) {

      console.log(err);

    }

  }

  return (

    <div style={styles.page}>

      <div style={styles.blur}></div>

      <div style={styles.revenueCard}>

        <FaStar
          size={70}
          color="#facc15"
        />

        <h1 style={styles.bigText}>
          {rating} ⭐
        </h1>

        <p>
          Customer Ratings
        </p>

      </div>

    </div>

  );
}

const styles = commonStyles;
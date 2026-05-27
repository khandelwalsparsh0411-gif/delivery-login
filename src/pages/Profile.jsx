import React, { useEffect, useState } from "react";

import { FaUserCircle } from "react-icons/fa";

import { supabase } from "../supabase";

export default function Profile() {

  const [userData, setUserData] = useState(null);

  useEffect(() => {

    fetchProfile();

  }, []);

  async function fetchProfile() {

    try {

      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return;

      // ORDERS TABLE SE USER DETAILS

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("customer_id", user.email)
        .order("id", { ascending: false })
        .limit(1);

      console.log("PROFILE DATA:", data);

      console.log("ERROR:", error);

      if (error) {

        console.log(error);

        return;

      }

      if (data.length > 0) {

        setUserData({
          name: data[0].customer_name,
          email: user.email,
        });

      } else {

        setUserData({
          name: "Customer",
          email: user.email,
        });

      }

    } catch (err) {

      console.log(err);

    }

  }

  return (

    <div style={styles.page}>

      <div style={styles.blur}></div>

      <div style={styles.profileCard}>

        <FaUserCircle
          size={130}
          color="#60a5fa"
        />

        <h1 style={styles.name}>

          {userData?.name || "Loading..."}

        </h1>

        <p style={styles.email}>

          {userData?.email || "Loading..."}

        </p>

        <div style={styles.info}>

          Premium Customer ⭐

        </div>

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
    overflow:"hidden"
  },

  blur:{
    width:"350px",
    height:"350px",
    background:"#2563eb",
    borderRadius:"50%",
    filter:"blur(150px)",
    position:"absolute",
    opacity:0.5
  },

  profileCard:{
    width:"100%",
    maxWidth:"420px",
    padding:"50px",
    borderRadius:"35px",
    background:"rgba(255,255,255,0.06)",
    border:"1px solid rgba(255,255,255,0.08)",
    textAlign:"center",
    backdropFilter:"blur(20px)",
    color:"white",
    zIndex:2
  },

  name:{
    marginTop:"20px",
    fontSize:"45px"
  },

  email:{
    marginTop:"10px",
    color:"#94a3b8"
  },

  info:{
    marginTop:"30px",
    padding:"18px",
    borderRadius:"16px",
    background:"linear-gradient(to right,#2563eb,#9333ea)"
  }

};
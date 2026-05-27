import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabase";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email.trim())
      .eq("password", password.trim());

      console.log(data[0]);

    if (error) {
      alert(error.message);
      return;
    }

    if (!data || data.length === 0) {
      alert("Invalid Login");
      return;
    }

    localStorage.setItem("user", JSON.stringify(data[0]));

const role = data[0].role?.trim()?.toLowerCase();

if (role === "admin") {
  navigate("/admin");
} else if (role === "delivery") {
  navigate("/delivery");
} else {
  navigate("/customer");
}
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <div style={styles.left}>
          <h1 style={styles.logo}>QuickDrop</h1>

          <h2 style={styles.tagline}>
            Fast & Reliable Delivery Service
          </h2>

          <p style={styles.text}>
            Order food, groceries and parcels instantly.
          </p>

          <div style={styles.cards}>
            <div style={styles.card}>
              🍔 Burger Delivery
            </div>

            <div style={styles.card}>
              🍕 Pizza Delivery
            </div>

            <div style={styles.card}>
              🛒 Grocery Delivery
            </div>
          </div>
        </div>

        <div style={styles.right}>
          <div style={styles.loginBox}>
            <h1 style={styles.heading}>Login</h1>

            <input
              style={styles.input}
              type="email"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              style={styles.input}
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button style={styles.button} onClick={loginUser}>
              Login
            </button>

            <button
              style={styles.signupBtn}
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background:
      "linear-gradient(to right, #0f172a, #1e293b)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },

  overlay: {
    width: "100%",
    maxWidth: "1200px",
    display: "flex",
    backgroundColor: "#111827",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 5px 20px rgba(0,0,0,0.4)",
  },

  left: {
    flex: 1,
    padding: "50px",
    color: "white",
    background:
      "linear-gradient(to bottom right,#2563eb,#1d4ed8)",
  },

  logo: {
    fontSize: "45px",
    marginBottom: "20px",
  },

  tagline: {
    fontSize: "30px",
    marginBottom: "15px",
  },

  text: {
    fontSize: "18px",
    color: "#dbeafe",
  },

  cards: {
    marginTop: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: "20px",
    borderRadius: "15px",
    fontSize: "20px",
    color: "white",
  },

  right: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a",
    padding: "40px",
  },

  loginBox: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#1e293b",
    padding: "40px",
    borderRadius: "20px",
  },

  heading: {
    color: "white",
    marginBottom: "30px",
    textAlign: "center",
    fontSize: "35px",
  },

  input: {
    width: "100%",
    padding: "14px",
    marginTop: "15px",
    borderRadius: "10px",
    border: "1px solid #475569",
    backgroundColor: "#334155",
    color: "white",
    fontSize: "16px",
  },

  button: {
    width: "100%",
    marginTop: "25px",
    padding: "14px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    cursor: "pointer",
  },

  signupBtn: {
    width: "100%",
    marginTop: "15px",
    padding: "14px",
    backgroundColor: "#10b981",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Login;
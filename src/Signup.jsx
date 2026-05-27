import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabase";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");

  const signupUser = async () => {
    const { error } = await supabase.from("users").insert([
      {
        name,
        email,
        password,
        role,
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Signup Successful");

    navigate("/");
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.heading}>Signup</h1>

        <input
          style={styles.input}
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          style={styles.input}
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          style={styles.select}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="customer">Customer</option>
          <option value="delivery">Delivery Boy</option>
          <option value="admin">Admin</option>
        </select>

        <button style={styles.button} onClick={signupUser}>
          Signup
        </button>

        <p style={styles.text}>
          Already have an account?
        </p>

        <button
          style={styles.loginBtn}
          onClick={() => navigate("/")}
        >
          Login
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #1e3a8a, #2563eb, #60a5fa)",
    padding: "20px",
  },

  box: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "20px",
    width: "380px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },

  heading: {
    textAlign: "center",
    marginBottom: "25px",
    color: "#1e3a8a",
    fontSize: "38px",
    fontWeight: "bold",
  },

  input: {
    width: "100%",
    padding: "14px",
    marginTop: "15px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    fontSize: "16px",
    backgroundColor: "#f8fafc",
    color: "#111827",
    outline: "none",
    boxSizing: "border-box",
  },

  select: {
    width: "100%",
    padding: "14px",
    marginTop: "15px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    fontSize: "16px",
    backgroundColor: "#f8fafc",
    color: "#111827",
    outline: "none",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    marginTop: "25px",
    padding: "14px",
    background:
      "linear-gradient(135deg, #2563eb, #3b82f6)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "17px",
    fontWeight: "bold",
  },

  text: {
    textAlign: "center",
    marginTop: "20px",
    color: "#4b5563",
  },

  loginBtn: {
    width: "100%",
    marginTop: "10px",
    padding: "14px",
    background:
      "linear-gradient(135deg, #10b981, #34d399)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "17px",
    fontWeight: "bold",
  },
};

export default Signup;
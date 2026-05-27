import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

function CreateOrder() {

  const navigate = useNavigate();

  const [customerName, setCustomerName] =
    useState("");

  const [item, setItem] =
    useState("");

  const [address, setAddress] =
    useState("");

  async function placeOrder() {

    try {

      if (
        !customerName ||
        !item ||
        !address
      ) {
        alert("Please fill all fields");
        return;
      }

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!user) {
        alert("User not logged in");
        return;
      }

      // RANDOM PRICE
      const price =
        Math.floor(Math.random() * 400) +
        100;

      const { data, error } =
        await supabase
          .from("orders")
          .insert([
            {
              customer_id: user.email,

              customer_name:
                customerName,

              customer_id:
                user.email,

              item: item,

              items: [
                {
                  name: item,
                  quantity: 1,
                },
              ],

              address: address,

              status: "Pending",

              assigned_to: null,

              price: price,

              total: price,
            },
          ])
          .select();

      console.log(data);
      console.log(error);

      if (error) {

        console.log(error);

        alert(error.message);

      } else {

        // SAVE CURRENT ORDER ID
        localStorage.setItem(
          "currentOrderId",
          data[0].id
        );

        alert(
          "Order Placed Successfully 🚀"
        );

        setCustomerName("");
        setItem("");
        setAddress("");

        navigate("/customer");

      }

    } catch (err) {

      console.log(err);

    }

  }

  return (

    <div style={styles.page}>

      {/* LEFT */}

      <div style={styles.left}>

        <h1 style={styles.bigText}>
          Food <br />
          Delivery <br />
          Dashboard
        </h1>

        <div style={styles.rocket}>
          🚀
        </div>

        <div style={styles.card}>

          <div style={styles.icon}>
            🛵
          </div>

          <div>

            <h2 style={styles.cardTitle}>
              Fast Delivery
            </h2>

            <p style={styles.cardText}>
              Live tracking &
              smart delivery system
            </p>

          </div>

        </div>

      </div>

      {/* RIGHT */}

      <div style={styles.right}>

        <div style={styles.formBox}>

          <h1 style={styles.heading}>
            Create Order
          </h1>

          <input
            type="text"
            placeholder="👤 Customer Name"
            value={customerName}
            onChange={(e) =>
              setCustomerName(
                e.target.value
              )
            }
            style={styles.input}
          />

          <input
            type="text"
            placeholder="🍔 Food Item"
            value={item}
            onChange={(e) =>
              setItem(e.target.value)
            }
            style={styles.input}
          />

          <input
            type="text"
            placeholder="📍 Delivery Address"
            value={address}
            onChange={(e) =>
              setAddress(
                e.target.value
              )
            }
            style={styles.input}
          />

          <button
            style={styles.button}
            onClick={placeOrder}
          >
            🚀 Place Order
          </button>

        </div>

      </div>

    </div>

  );
}

const styles = {

  page:{
    minHeight:"100vh",
    background:"#050816",
    display:"flex",
    color:"white",
    fontFamily:"Arial",
    padding:"40px",
    gap:"40px",
    flexWrap:"wrap"
  },

  left:{
    flex:1,
    minWidth:"300px",
    display:"flex",
    flexDirection:"column",
    justifyContent:"center"
  },

  bigText:{
    fontSize:"90px",
    fontWeight:"900",
    lineHeight:"100px"
  },

  rocket:{
    fontSize:"90px",
    marginTop:"20px"
  },

  card:{
    marginTop:"40px",
    background:"rgba(255,255,255,0.06)",
    border:"1px solid rgba(255,255,255,0.08)",
    borderRadius:"30px",
    padding:"30px",
    display:"flex",
    alignItems:"center",
    gap:"20px",
    backdropFilter:"blur(20px)"
  },

  icon:{
    fontSize:"50px"
  },

  cardTitle:{
    fontSize:"35px"
  },

  cardText:{
    color:"#cbd5e1",
    marginTop:"10px"
  },

  right:{
    flex:1,
    minWidth:"320px",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },

  formBox:{
    width:"100%",
    maxWidth:"500px",
    background:"rgba(255,255,255,0.06)",
    border:"1px solid rgba(255,255,255,0.08)",
    borderRadius:"35px",
    padding:"40px",
    backdropFilter:"blur(20px)"
  },

  heading:{
    fontSize:"55px",
    marginBottom:"30px"
  },

  input:{
    width:"100%",
    padding:"20px",
    marginBottom:"22px",
    borderRadius:"20px",
    border:"none",
    outline:"none",
    background:"rgba(255,255,255,0.08)",
    color:"white",
    fontSize:"18px"
  },

  button:{
    width:"100%",
    padding:"20px",
    border:"none",
    borderRadius:"20px",
    background:
      "linear-gradient(to right,#38bdf8,#d946ef)",
    color:"white",
    fontSize:"20px",
    fontWeight:"700",
    cursor:"pointer"
  }

};

export default CreateOrder;